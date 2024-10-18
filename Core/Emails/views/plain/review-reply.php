<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title></title><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <?php echo apply_filters('get_google_font_link_for_email_template', ''); ?>
    <style type="text/css">
        <?php $fontStyles = apply_filters('get_desired_font_style', []);?>
        #outlook a {
            padding: 0;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]--><!--[if lte mso 11]>
    <style type="text/css">
        .mj-outlook-group-fix {
            width: 100% !important;
        }
    </style>
    <![endif]-->
    <style type="text/css">
        @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }
        }
    </style>
    <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width: 480px) {
            table.mj-full-width-mobile {
                width: 100% !important;
            }

            td.mj-full-width-mobile {
                width: auto !important;
            }
        }
    </style>
</head>

<body style="word-spacing:normal;">
<div  class="<?php echo esc_attr($fontStyles['class']); ?>" style="background-color:<?php echo esc_attr($data['styles']['email_bg_color']); ?>; border-radius:15px 15px 15px 15px; color:<?php echo esc_attr($data['styles']['email_text_color']); ?> <?php echo esc_attr($fontStyles['content']); ?>">
    <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
    >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:20px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
               style="width:100%;">
            <tbody>
            <tr>
                <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:0px;text-align:center;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                    <div class="mj-column-per-100 mj-outlook-group-fix"
                         style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                            <tr>
                                <td style="vertical-align:top;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                        <tbody></tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->

    <?php if ($brandSettings->isLogoEnabled()): ?>
        <!--[if mso | IE]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
        >
            <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                   style="width:100%;">
                <tbody>
                <tr>
                    <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:0px;text-align:center;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="" style="vertical-align:top;width:600px;"><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix"
                             style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                   style="vertical-align:top;" width="100%">
                                <tbody>
                                <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                               style="border-collapse:collapse;border-spacing:0px;">
                                            <tbody>
                                            <tr>
                                                <td style="width:45px;"><img height="auto"
                                                                             src="{logo_src}"
                                                                             style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                             width="45"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if mso | IE]></td>
                        </tr>
                        </table><![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]>
        </td>
        </tr>
        </table><![endif]-->
    <?php endif; ?>

    <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
    >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
               style="width:100%;">
            <tbody>
            <tr>
                <td style="direction:ltr;font-size:0px;text-align:center;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                    <![endif]-->
                    <?php if ($brandSettings->isEmailBannerEnabled()): ?>
                        <!--[if mso | IE]>
                        <td class="" style="">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class=""
                                   style="" >
                                <tr>
                                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                        <![endif]-->
                        <div style="margin:0px auto;border-radius:15px 15px 0 0;max-width:NaNpx;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                   style="width:100%;border-radius:15px 15px 0 0;">
                                <tbody>
                                <tr>
                                    <td style="direction:ltr;font-size:0px;text-align:center;">
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td class="" style="vertical-align:top;"><![endif]-->
                                        <div class="mj-column-per-100 mj-outlook-group-fix"
                                             style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                   style="vertical-align:top;" width="100%">
                                                <tbody>
                                                <tr>
                                                    <td align="center"
                                                        style="font-size:0px;padding:10px;padding-right:10px;padding-left:10px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                               role="presentation"
                                                               style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                            <tr>
                                                                <td style="width:100%;"><img height="auto"
                                                                                             src="<?php echo $brandSettings->getEmailBanner() ?>"
                                                                                             style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                                             width="100%"></td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!--[if mso | IE]></td></tr></table><![endif]-->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table></td><![endif]-->
                    <?php endif; ?>

                    <!--[if mso | IE]>
                    <td class="" style="">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:NaNpx;"
                        >
                            <tr>
                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="margin:0px auto;border-radius:0 0 15px 15px;max-width:NaNpx;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                               style="width:100%;border-radius:0 0 15px 15px;">
                            <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                    <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td class="" style="vertical-align:top;width:NaNpx;"><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                         style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                               style="vertical-align:top;" width="100%">
                                            <tbody>
                                            <tr>
                                                <td align="left"
                                                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                    <div style="font-family:Helvetica, sans-serif;font-size:16px;line-height:1.5;text-align:left;">
                                                        {body}
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td>
                                    </tr>
                                    </table><![endif]-->
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td>
                    </tr>
                    </table>
                    </td>
                    <![endif]-->
                    <?php if ($generalSettings->isFooterEnabled()) ?>
                <!--[if mso | IE]>
                <td class="" style="">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:NaNpx;"
                    >
                        <tr>
                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                    <div style="margin:0px auto;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                               style="width:100%;">
                            <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:0px;padding-top:0px;text-align:center;">
                                    <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td class="" style="vertical-align:top;width:NaNpx;"><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix"
                                         style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <?php if ($generalSettings->isFooterEnabled()): ?>
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                               style="vertical-align:top;" width="100%">
                                            <tbody>
                                            <tr>
                                                <td align="center"
                                                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                    <p
                                                            style="border-top:solid 2px ;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 2px 3;font-size:1px;margin:0px auto;width:NaNpx;" role="presentation" width="NaNpx">
                                                        <tr>
                                                            <td style="height:0;line-height:0;"> &nbsp;
                                                            </td>
                                                        </tr>
                                                    </table><![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center"
                                                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                    <div style="font-family:Helvetica, sans-serif;font-size:14px;line-height:1;text-align:center;">
                                                        <p>{footer_text}</p>
                                                        <a
                                                                data-cke-saved-href="http://localhost:7000"
                                                                href="#"
                                                                style=""><?php echo esc_attr('Unsubscribe', 'f-review') ?></a><br>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]>
                                    </td>
                                    </tr>
                                    </table><![endif]-->
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                <!--[if mso | IE]>
                </td>
                </tr>
                </table>
                </td>
                <![endif]-->
                <?php endif; ?>
                    <!--[if mso | IE]>
                    </tr>
                    </table><![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
</div>
</body>

</html>
