<?php
defined('TYPO3') || die();

(static function() {
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        'ExtbaseBook.Simpleblog',
        'Bloglisting',
        [
            \ExtbaseBook\Simpleblog\Controller\BlogController::class => 'list'
        ],
        // non-cacheable actions
        [
            \ExtbaseBook\Simpleblog\Controller\BlogController::class => 'list'
        ]
    );

    // wizards
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        'mod {
            wizards.newContentElement.wizardItems.plugins {
                elements {
                    bloglisting {
                        iconIdentifier = simpleblog-plugin-bloglisting
                        title = LLL:EXT:simpleblog/Resources/Private/Language/locallang_db.xlf:tx_simpleblog_bloglisting.name
                        description = LLL:EXT:simpleblog/Resources/Private/Language/locallang_db.xlf:tx_simpleblog_bloglisting.description
                        tt_content_defValues {
                            CType = list
                            list_type = simpleblog_bloglisting
                        }
                    }
                }
                show = *
            }
       }'
    );
})();
