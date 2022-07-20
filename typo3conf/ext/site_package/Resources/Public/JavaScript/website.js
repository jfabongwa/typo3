/**
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code of
 * the TYPO3 source package.
 *
 * The TYPO3 project - inspiring people to share!
 */

 $(document).ready(function() {
     $('.tx-felogin-pi1 form fieldset div').each(function(id) {
         $(this).addClass('form-group');
     })
     $('.tx-felogin-pi1 form fieldset div input').each(function(id) {
         var type = $(this).attr('type');
         if (type == 'text' || type == 'password') {
             $(this).addClass('form-control');
         }
         if (type == 'submit') {
             $(this).addClass('btn btn-primary');
         }
     });
 });
