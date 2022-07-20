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
class BlogTest extends UnitTestCase
{
    /**
     * @var \ExtbaseBook\Simpleblog\Domain\Model\Blog|MockObject|AccessibleObjectInterface
     */
    protected $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = $this->getAccessibleMock(
            \ExtbaseBook\Simpleblog\Domain\Model\Blog::class,
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
    public function getDescriptionReturnsInitialValueForString(): void
    {
        self::assertSame(
            '',
            $this->subject->getDescription()
        );
    }

    /**
     * @test
     */
    public function setDescriptionForStringSetsDescription(): void
    {
        $this->subject->setDescription('Conceived at T3CON10');

        self::assertEquals('Conceived at T3CON10', $this->subject->_get('description'));
    }

    /**
     * @test
     */
    public function getImageReturnsInitialValueForFileReference(): void
    {
        self::assertEquals(
            null,
            $this->subject->getImage()
        );
    }

    /**
     * @test
     */
    public function setImageForFileReferenceSetsImage(): void
    {
        $fileReferenceFixture = new \TYPO3\CMS\Extbase\Domain\Model\FileReference();
        $this->subject->setImage($fileReferenceFixture);

        self::assertEquals($fileReferenceFixture, $this->subject->_get('image'));
    }

    /**
     * @test
     */
    public function getPostsReturnsInitialValueForPost(): void
    {
        $newObjectStorage = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        self::assertEquals(
            $newObjectStorage,
            $this->subject->getPosts()
        );
    }

    /**
     * @test
     */
    public function setPostsForObjectStorageContainingPostSetsPosts(): void
    {
        $post = new \ExtbaseBook\Simpleblog\Domain\Model\Post();
        $objectStorageHoldingExactlyOnePosts = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
        $objectStorageHoldingExactlyOnePosts->attach($post);
        $this->subject->setPosts($objectStorageHoldingExactlyOnePosts);

        self::assertEquals($objectStorageHoldingExactlyOnePosts, $this->subject->_get('posts'));
    }

    /**
     * @test
     */
    public function addPostToObjectStorageHoldingPosts(): void
    {
        $post = new \ExtbaseBook\Simpleblog\Domain\Model\Post();
        $postsObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->onlyMethods(['attach'])
            ->disableOriginalConstructor()
            ->getMock();

        $postsObjectStorageMock->expects(self::once())->method('attach')->with(self::equalTo($post));
        $this->subject->_set('posts', $postsObjectStorageMock);

        $this->subject->addPost($post);
    }

    /**
     * @test
     */
    public function removePostFromObjectStorageHoldingPosts(): void
    {
        $post = new \ExtbaseBook\Simpleblog\Domain\Model\Post();
        $postsObjectStorageMock = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->onlyMethods(['detach'])
            ->disableOriginalConstructor()
            ->getMock();

        $postsObjectStorageMock->expects(self::once())->method('detach')->with(self::equalTo($post));
        $this->subject->_set('posts', $postsObjectStorageMock);

        $this->subject->removePost($post);
    }
}
