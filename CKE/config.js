CKEDITOR.editorConfig = function (config) {

    config.autoGrow_onStartup = true;
    config.autoGrow_bottomSpace = 20;

    // LightWire skin
    if (CKEskin && CKEskin !== 'default') {
        config.skin = CKEskin + ',' + aosUrl + 'CKE/skins/' + CKEskin + '/';
    }
};
