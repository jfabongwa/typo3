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
class PostTest extends UnitTestCase
{
    /**
     * @var \ExtbaseBook\Simpleblog\Domain\Model\Post|MockObject|AccessibleObjectInterface
     */
    protected $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = $this->getAccessibleMock(
            \ExtbaseBook\Simpleblog\Domain\Model\Post::class,
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
    public function getTitleReturnsInitialValueForString(): void
    {
        self::assertSame(
            '',
            $this->subject->getTitle()
        );
    }

    /**
     * @test
     */
    public function setTitleForStringSetsTitle(): void
    {
        $this->subject->setTitle('Conceived at T3CON10');

        self::assertEquals('Conceived at T3CON10', $this->subject->_get('title'));
    }

    /**
     * @test
     */
    public function getContentReturnsInitialValueForString(): void
    {
        self::assertSame(
            '',
            $this->subject->getContent()
        );
    }

    /**
     * @test
     */
    public function setContentForStringSetsContent(): void
    {
        $this->subject->setContent('Conceived at T3CON10');

        self::assertEquals('Conceived at T3CON10', $this->subject->_get('content'));
    }

    /**
     * @test
     */
    public function getPostdateReturnsInitialValueForDateTime(): void
    {
        self::assertEquals(
            null,
            $this->subject->getPostdate()
        );
    }

    /**
     * @test
     */
    public function setPostdateForDateTimeSetsPostdate(): void
    {
        $dateTimeFixture = new \DateTime();
        $this->subject->setPostdate($dateTimeFixture);

        self::assertEquals($dateTimeFixture, $this->subject->_get('postdate'));
    }

    /**
     * @test
     */
    public function getCommentsReturnsInitialValueForComment(): void
    {
        $newObjectStorage = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        self::assertEquals(
            $newObjectStorage,
            $this->subject->getComments()
        );
    }

    /**
     * @test
     */
    public function setCommentsForObjectStorageContainingCommentSetsComments(): void
    {
        $comment = new \ExtbaseBook\Simpleblog\Domain\Model\Comment();
        $objectStorageHoldingExactlyOneComments = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        $objectStorageHoldingExactlyOneComments->attach($comment);
        $this->subject->setComments($objectStorageHoldingExactlyOneComments);

        self::assertEquals($objectStorageHoldingExactlyOneComments, $this->subject->_get('comments'));
    }

    /**
     * @test
     */
    public function addCommentToObjectStorageHoldingComments(): void
    {
        $comment = new \ExtbaseBook\Simpleblog\Domain\Model\Comment();
        $commentsObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->onlyMethods(['attach'])
            ->disableOriginalConstructor()
            ->getMock();

        $commentsObjectStorageMock->expects(self::once())->method('attach')->with(self::equalTo($comment));
        $this->subject->_set('comments', $commentsObjectStorageMock);

        $this->subject->addComment($comment);
    }

    /**
     * @test
     */
    public function removeCommentFromObjectStorageHoldingComments(): void
    {
        $comment = new \ExtbaseBook\Simpleblog\Domain\Model\Comment();
        $commentsObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->onlyMethods(['detach'])
            ->disableOriginalConstructor()
            ->getMock();

        $commentsObjectStorageMock->expects(self::once())->method('detach')->with(self::equalTo($comment));
        $this->subject->_set('comments', $commentsObjectStorageMock);

        $this->subject->removeComment($comment);
    }

    /**
     * @test
     */
    public function getAuthorReturnsInitialValueForAuthor(): void
    {
        self::assertEquals(
            null,
            $this->subject->getAuthor()
        );
    }

    /**
     * @test
     */
    public function setAuthorForAuthorSetsAuthor(): void
    {
        $authorFixture = new \ExtbaseBook\Simpleblog\Domain\Model\Author();
        $this->subject->setAuthor($authorFixture);

        self::assertEquals($authorFixture, $this->subject->_get('author'));
    }

    /**
     * @test
     */
    public function getTagsReturnsInitialValueForTag(): void
    {
        $newObjectStorage = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        self::assertEquals(
            $newObjectStorage,
            $this->subject->getTags()
        );
    }

    /**
     * @test
     */
    public function setTagsForObjectStorageContainingTagSetsTags(): void
    {
        $tag = new \ExtbaseBook\Simpleblog\Domain\Model\Tag();
        $objectStorageHoldingExactlyOneTags = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        $objectStorageHoldingExactlyOneTags->attach($tag);
        $this->subject->setTags($objectStorageHoldingExactlyOneTags);

        self::assertEquals($objectStorageHoldingExactlyOneTags, $this->subject->_get('tags'));
    }

    /**
     * @test
     */
    public function addTagToObjectStorageHoldingTags(): void
    {
        $tag = new \ExtbaseBook\Simpleblog\Domain\Model\Tag();
        $tagsObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->onlyMethods(['attach'])
            ->disableOriginalConstructor()
            ->getMock();

        $tagsObjectStorageMock->expects(self::once())->method('attach')->with(self::equalTo($tag));
        $this->subject->_set('tags', $tagsObjectStorageMock);

        $this->subject->addTag($tag);
    }

    /**
     * @test
     */
    public function removeTagFromObjectStorageHoldingTags(): void
    {
        $tag = new \ExtbaseBook\Simpleblog\Domain\Model\Tag();
        $tagsObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->onlyMethods(['detach'])
            ->disableOriginalConstructor()
            ->getMock();

        $tagsObjectStorageMock->expects(self::once())->method('detach')->with(self::equalTo($tag));
        $this->subject->_set('tags', $tagsObjectStorageMock);

        $this->subject->removeTag($tag);
    }
}
