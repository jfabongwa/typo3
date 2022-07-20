<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Simple Blog Extension',
    'description' => 'Demo extension to implement a simple Blog, based on the \"TYPO3 Extbase\" book',
    'category' => 'plugin',
    'author' => 'J. Abongwa',
    'author_email' => 'j.abongwa@meramo.de',
    'state' => 'alpha',
    'clearCacheOnLoad' => 0,
    'version' => '1.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '11.5.0-11.5.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
