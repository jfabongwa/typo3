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
class CommentTest extends UnitTestCase
{
    /**
     * @var \ExtbaseBook\Simpleblog\Domain\Model\Comment|MockObject|AccessibleObjectInterface
     */
    protected $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = $this->getAccessibleMock(
            \ExtbaseBook\Simpleblog\Domain\Model\Comment::class,
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
    public function getCommentReturnsInitialValueForString(): void
    {
        self::assertSame(
            '',
            $this->subject->getComment()
        );
    }

    /**
     * @test
     */
    public function setCommentForStringSetsComment(): void
    {
        $this->subject->setComment('Conceived at T3CON10');

        self::assertEquals('Conceived at T3CON10', $this->subject->_get('comment'));
    }

    /**
     * @test
     */
    public function getCommentdateReturnsInitialValueForDateTime(): void
    {
        self::assertEquals(
            null,
            $this->subject->getCommentdate()
        );
    }

    /**
     * @test
     */
    public function setCommentdateForDateTimeSetsCommentdate(): void
    {
        $dateTimeFixture = new \DateTime();
        $this->subject->setCommentdate($dateTimeFixture);

        self::assertEquals($dateTimeFixture, $this->subject->_get('commentdate'));
    }
}
