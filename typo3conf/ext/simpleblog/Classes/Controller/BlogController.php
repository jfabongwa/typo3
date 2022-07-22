<?php

declare(strict_types=1);

namespace ExtbaseBook\Simpleblog\Controller;

//use \TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use ExtbaseBook\Simpleblog\Domain\Model\Blog;


/**
 * This file is part of the "Simple Blog Extension" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * (c) 2022 J. Abongwa <j.abongwa@meramo.de>, Meramo Verlag GmbH 
 */

/**
 * BlogController
 */
class BlogController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{

    /**
     * blogRepository
     *
     * @var \Extbasebook\Simpleblog\Domain\Repository\BlogRepository
     */
    protected $blogRepository = null;

    /**
     * @param \Extbasebook\Simpleblog\Domain\Repository\BlogRepository $blogRepository
     */
    public function __construct(\ExtbaseBook\Simpleblog\Domain\Repository\BlogRepository $blogRepository)
    {
      $this->blogRepository = $blogRepository;
      
    }

    /**
     * action list
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function listAction(Blog $blog): void {
      $blogs = [];
      for ($i = 1; $i <= 3; $i++) {
          /** @var \ExtbaseBook\Simpleblog\Domain\Model\Blog $blog */
          $blog->setTitle('This is the ' . $i . '. Blog!');
          $blogs[] = $blog;
      }
        $this->view->assign('blogs', $blogs);
        $this->responseFactory->createHtmlResponce($this->view->render());
      }
      
}
