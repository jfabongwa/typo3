<?php
defined('TYPO3_MODE') || die();

call_user_func(function () {
    /**
     * Extension key
     */
    $extensionKey = 'site_package';

    /**
     * Add default TypoScript (constants and setup)
     */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
        $extensionKey,
        'Configuration/TypoScript',
        'Site Package'
    );
});
