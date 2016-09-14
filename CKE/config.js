CKEDITOR.editorConfig = function (config) {

    // clear cache?
    //CKEDITOR.timestamp='ABCD';

    config.autoGrow_onStartup = true;
    config.autoGrow_bottomSpace = 20;

    // LightWire skin
    if (aosUrl && CKEskin && CKEskin !== 'default') {
        config.skin = CKEskin + ',' + aosUrl + 'CKE/skins/' + CKEskin + '/';
    }
};
