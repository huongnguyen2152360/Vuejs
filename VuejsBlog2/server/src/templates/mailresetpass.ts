// import { Context } from 'koa'
export function mailresetpass(email) {
        return `
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css?family=Open Sans:400,400i,700,700i" rel="stylesheet">
    <!--<![endif]-->
</head>

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table class="es-content esd-header-popover" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr> </tr>
                                <tr>
                                    <td class="esd-stripe" esd-custom-block-id="7964" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="640" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p15t es-p15b es-p20r es-p20l" align="left">
                                                        <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td width="290" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="290" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="es-infoblock esd-block-text es-m-txt-c" align="left">
                                                                                        <p style="font-family: arial, helvetica\ neue, helvetica, sans-serif;">Put your preheader text here<br></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="290" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="290" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="es-infoblock esd-block-text es-m-txt-c" align="right">
                                                                                        <p><a href="http://#" target="_blank" style="font-family: 'arial', 'helvetica neue', 'helvetica', 'sans-serif';">View in browser</a><br></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe esd-checked" style="background-image:url(https://tlr.stripocdn.email/content/guids/CABINET_729b6a94015d410538fa6f6810b21b85/images/9701519718227204.jpg);background-color: rgb(61, 76, 107); background-position: left top; background-repeat: no-repeat; background-size: cover;" bgcolor="#3d4c6b" align="center">
                                        <table class="es-content-body" style="background-color: transparent;" width="640" cellspacing="0" cellpadding="0" bgcolor="#f6f6f6" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image es-p10t es-p10b" align="center">
                                                                                        <a href="" target="_blank"><img src="https://cdn.worldvectorlogo.com/logos/stratis-strat-2.svg" style="display: block;" alt="Logo" title="Logo" width="85"></a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p20b">
                                                                                        <h1 style="color: #ffffff; font-size: 30px;">Huong VuejsBlog</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p20b">
                                                                                        <h1 style="color: #ffffff; font-size: 36px;">Reset your Password</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p15b es-p20r es-p20l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td esdev-links-color="#b7bdc9" class="esd-block-text es-p15t es-p20b" align="center">
                                                                                        <p style="color: #b7bdc9; font-family: 'open sans', 'helvetica neue', helvetica, arial, sans-serif;">Hey there ${email}!</p>
                                                                                        <p style="color: #b7bdc9; font-family: 'open sans', 'helvetica neue', helvetica, arial, sans-serif;">It seems like you have forgotten your password on our website. To reset your password, please click on the link below: <a href="http://localhost:8080/resetpass/${email}"></a> or:</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-button es-p5t es-p40b" align="center"> <span class="es-button-border"> <a href="http://localhost:8080/resetpass/${email}" class="es-button" target="_blank" style="color: rgb(255, 255, 255);">Reset password now →</a> </span> </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="es-footer esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" esd-custom-block-id="6564" align="center">
                                        <table class="es-footer-body" width="640" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p40b es-p20r es-p20l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image es-p5b" align="center">
                                                                                        <a target="_blank"> <img src="https://cdn.worldvectorlogo.com/logos/stratis-strat-2.svg" alt="Logo" style="display: block;" title="Logo" width="35"> </a>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p15t es-p15b" align="center">
                                                                                        <p>675 Massachusetts Avenue</p>
                                                                                        <p>Cambridge, MA 02139</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text" align="center">
                                                                                        <p><u><a target="_blank" href="https://viewstripo.email/">View Online</a></u>&nbsp;&nbsp; • &nbsp;&nbsp;<u><a target="_blank" href="https://viewstripo.email/">Unsubscribe</a></u></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
    `
    }