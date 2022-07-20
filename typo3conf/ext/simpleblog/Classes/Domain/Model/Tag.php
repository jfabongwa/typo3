<?php

declare(strict_types=1);

namespace ExtbaseBook\Simpleblog\Domain\Model;


/**
 * This file is part of the "Simple Blog Extension" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * (c) 2022 J. Abongwa <j.abongwa@meramo.de>, Meramo Verlag GmbH 
 */

/**
 * Tags
 */
class Tag extends \TYPO3\CMS\Extbase\DomainObject\AbstractValueObject
{

    /**
     * Tag
     *
     * @var string
     * @TYPO3\CMS\Extbase\Annotation\Validate("NotEmpty")
     */
    protected $tagValue = '';

    /**
     * Returns the tagValue
     *
     * @return string
     */
    public function getTagValue()
    {
        return $this->tagValue;
    }

    /**
     * Sets the tagValue
     *
     * @param string $tagValue
     * @return void
     */
    public function setTagValue(string $tagValue)
    {
        $this->tagValue = $tagValue;
    }
}
