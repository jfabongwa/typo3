<?php

declare(strict_types=1);

namespace ExtbaseBook\Simpleblog\Tests\Unit\Domain\Model;

use PHPUnit\Framework\MockObject\MockObject;
use TYPO3\TestingFramework\Core\AccessibleObjectInterface;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

/**
 * Test case
 *
 * @author J. Abongwa <j.abongwa@meramo.de>
 */
class TagTest extends UnitTestCase
{
    /**
     * @var \ExtbaseBook\Simpleblog\Domain\Model\Tag|MockObject|AccessibleObjectInterface
     */
    protected $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = $this->getAccessibleMock(
            \ExtbaseBook\Simpleblog\Domain\Model\Tag::class,
            ['dummy']
        );
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function getTagValueReturnsInitialValueForString(): void
    {
        self::assertSame(
            '',
            $this->subject->getTagValue()
        );
    }

    /**
     * @test
     */
    public function setTagValueForStringSetsTagValue(): void
    {
        $this->subject->setTagValue('Conceived at T3CON10');

        self::assertEquals('Conceived at T3CON10', $this->subject->_get('tagValue'));
    }
}
