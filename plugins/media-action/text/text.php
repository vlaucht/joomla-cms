<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Media-Action.text
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
/**
 * Media Manager Text Action
 *
 * @since  4.0.0
 */
class PlgMediaActionText extends \Joomla\Component\Media\Administrator\Plugin\MediaActionPlugin
{
	public function onInit($form)
	{
		$field = $form->getField('fontFamily');
		$fonts = $this->getFonts();
		foreach ($fonts as $font)
		{
			$field->addOption($font['name'], ['value' => $font['name']]);
		}
	}


	protected function getFonts()
	{
		return json_decode(file_get_contents(__DIR__ . '/fonts.json'), true);
	}
}
