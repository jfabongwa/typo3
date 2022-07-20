<?php
defined('TYPO3_MODE') || die();

call_user_func(function () {
    /**
     * Extension key
     */
    $extensionKey = 'site_package';

    /**
     * Include Page TSConfig
     */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extensionKey,
        'Configuration/TypoScript/backendlayouts.typoscript',
        'Backend Layouts'
    );
});
