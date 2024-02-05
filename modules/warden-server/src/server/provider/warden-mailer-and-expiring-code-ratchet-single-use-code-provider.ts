import {
  WardenContact,
  WardenContactType,
  WardenCustomerMessageType,
  WardenCustomTemplateDescriptor,
} from '@bitblit/ratchet-warden-common';
import { WardenSingleUseCodeProvider } from './warden-single-use-code-provider';
import { ExpiringCode, ExpiringCodeRatchet, Mailer, ReadyToSendEmail } from '@bitblit/ratchet-aws';
import { Base64Ratchet, ErrorRatchet, Logger, StringRatchet } from '@bitblit/ratchet-common';
import { WardenMailerAndExpiringCodeRatchetSingleUseCodeProviderOptions } from './warden-mailer-and-expiring-code-ratchet-single-user-provider-options.js';
import { SendRawEmailResponse } from '@aws-sdk/client-ses';

/**
 * Classes implementing WardenSingleUseCodeProvider are able to
 * generate single-use codes for a user, and to validate a code
 * provided by the user
 **/

export class WardenMailerAndExpiringCodeRatchetSingleUseCodeProvider implements WardenSingleUseCodeProvider {
  private static defaultOptions(): WardenMailerAndExpiringCodeRatchetSingleUseCodeProviderOptions {
    const rval: WardenMailerAndExpiringCodeRatchetSingleUseCodeProviderOptions = {
      emailBaseLayoutName: undefined,
      expiringTokenHtmlTemplateName: 'expiring-token-request-email',
      expiringTokenTxtTemplateName: undefined,
      magicLinkHtmlTemplateName: 'magic-token-request-email',
      magicLinkTxtTemplateName: undefined,
    };
    return rval;
  }

  constructor(
    private mailer: Mailer,
    private expiringCodeRatchet: ExpiringCodeRatchet,
    private mailerOptions: WardenMailerAndExpiringCodeRatchetSingleUseCodeProviderOptions = WardenMailerAndExpiringCodeRatchetSingleUseCodeProvider.defaultOptions(),
  ) {}
  public handlesContactType(type: WardenContactType): boolean {
    return type === WardenContactType.EmailAddress;
  }

  public async createAndSendNewCode(contact: WardenContact, relyingPartyName: string): Promise<boolean> {
    let rval: boolean = null;
    const token: ExpiringCode = await this.expiringCodeRatchet.createNewCode({
      context: contact.value,
      length: 6,
      alphabet: '0123456789',
      timeToLiveSeconds: 300,
      tags: ['Login'],
    });
    const msg: any = await this.formatMessage(contact, WardenCustomerMessageType.ExpiringCode, {
      code: token.code,
      relyingPartyName: relyingPartyName,
    });
    rval = await this.sendMessage(msg);
    return rval;
  }
  public async checkCode(contactValue: string, code: string): Promise<boolean> {
    const rval: boolean = await this.expiringCodeRatchet.checkCode(code, contactValue);
    return rval;
  }
  public async createCodeAndSendMagicLink?(
    loginContact: WardenContact,
    relyingPartyName: string,
    landingUrl: string,
    metaIn?: Record<string, string>,
    ttlSeconds?: number,
    destinationContact?: WardenContact,
    customTemplate?: WardenCustomTemplateDescriptor,
  ): Promise<boolean> {
    let rval: boolean = null;
    const token: ExpiringCode = await this.expiringCodeRatchet.createNewCode({
      context: loginContact.value,
      length: 36,
      alphabet: StringRatchet.UPPER_CASE_LATIN,
      timeToLiveSeconds: ttlSeconds,
      tags: ['MagicLink'],
    });

    const meta: Record<string, any> = Object.assign({}, metaIn || {}, { contact: loginContact });
    const encodedMeta: string = Base64Ratchet.safeObjectToBase64JSON(meta || {});

    let landingUrlFilled: string = landingUrl;
    landingUrlFilled = landingUrlFilled.split('{CODE}').join(token.code);
    landingUrlFilled = landingUrlFilled.split('{META}').join(encodedMeta);

    const context: Record<string, string> = Object.assign({}, meta || {}, {
      landingUrl: landingUrlFilled,
      code: token.code,
      relyingPartyName: relyingPartyName,
    });

    const msgType: WardenCustomerMessageType = customTemplate ? WardenCustomerMessageType.Custom : WardenCustomerMessageType.MagicLink;
    const msg: ReadyToSendEmail = await this.formatMessage(loginContact, msgType, context, destinationContact, customTemplate);
    rval = await this.sendMessage(msg);
    return rval;
  }

  public async formatMessage(
    contact: WardenContact,
    messageType: WardenCustomerMessageType,
    context: Record<string, any>,
    destinationContact?: WardenContact,
    customTemplate?: WardenCustomTemplateDescriptor,
  ): Promise<ReadyToSendEmail> {
    const rts: ReadyToSendEmail = {
      destinationAddresses: [destinationContact?.value || contact.value],
      subject: 'Your login token',
    };

    Logger.info('Formatting Message for magic link, rts: %j, messageType: %s, context: %j', rts, messageType, context);

    if (messageType === WardenCustomerMessageType.ExpiringCode) {
      await this.mailer.fillEmailBody(
        rts,
        context,
        this.mailerOptions.expiringTokenHtmlTemplateName,
        this.mailerOptions.expiringTokenTxtTemplateName,
        this.mailerOptions.emailBaseLayoutName,
      );
    } else if (messageType === WardenCustomerMessageType.MagicLink) {
      await this.mailer.fillEmailBody(
        rts,
        context,
        this.mailerOptions.magicLinkHtmlTemplateName,
        this.mailerOptions.magicLinkTxtTemplateName,
        this.mailerOptions.emailBaseLayoutName,
      );
    } else if (messageType === WardenCustomerMessageType.Custom) {
      if (!customTemplate) {
        throw ErrorRatchet.fErr('Cannot send custom message if customTemplate not set');
      }
      Logger.info('Sending custom template : %j', customTemplate);
      await this.mailer.fillEmailBody(
        rts,
        context,
        customTemplate.htmlVersion,
        customTemplate.textVersion,
        customTemplate.baseLayout === 'DEFAULT' ? this.mailerOptions.emailBaseLayoutName : customTemplate.baseLayout,
      );
    } else {
      throw ErrorRatchet.fErr('No such message type : %s', messageType);
    }

    return rts;
  }

  public async sendMessage(message: ReadyToSendEmail): Promise<boolean> {
    const rval: SendRawEmailResponse = await this.mailer.sendEmail(message);
    Logger.debug('SendRawEmailResponse was : %j', rval);
    return !!rval;
  }
}
