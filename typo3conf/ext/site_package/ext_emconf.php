<?php

/*
 * This file is part of the TYPO3 extension "Site Package".
 * TYPO3 Extbase Book
 *
 * (c)2019 by Michael Schams <schams.net>
 * https://extbase-book.org
 */

$EM_CONF[$_EXTKEY] = [
    'title' => 'TYPO3 Extbase Book - Site Package',
    'description' => 'TYPO3 v9 Site Package (frontend theme)',
    'category' => 'templates',
    'author' => 'Michael Schams',
    'author_email' => '',
    'author_company' => '',
    'version' => '1.0.0',
    'state' => 'stable',
    'constraints' => [
        'depends' => [
          'typo3' => '11.4.0-11.5.99',
          'fluid_styled_content' => '11.4.0-11.5.99'
        ],
        'conflicts' => [
        ],
    ],
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1
];
