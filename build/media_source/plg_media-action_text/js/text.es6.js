/**
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

Joomla.MediaManager = Joomla.MediaManager || {};
Joomla.MediaManager.Edit = Joomla.MediaManager.Edit || {};

(() => {
  'use strict';

  let active = false;
  let currentX;
  let currentY;
  let initialX = 50;
  let initialY = 0;
  let xOffset = 0;
  let yOffset = 0;
  let dragItem;
  let container;
  let text;

  const render = () => {
    const canvas = document.createElement('canvas');

    const image = document.getElementById('image-source');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.font = "50px 'Montserrat'";
    initialX = initialX || canvas.width;

    ctx.fillText(text, initialX, initialY);
    const format = Joomla.MediaManager.Edit.original.extension === 'jpg' ? 'jpeg' : 'jpg';
    Joomla.MediaManager.Edit.current.contents = canvas.toDataURL(`image/${format}`);
    const preview = document.getElementById('image-preview');
    preview.width = canvas.width;
    preview.height = canvas.height;
    preview.src = Joomla.MediaManager.Edit.current.contents;
    window.dispatchEvent(new Event('mediaManager.history.point'));
  }

  const dragStart = (e) => {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
      active = true;
    }
  };

  const dragEnd = () => {
    initialX = currentX;
    initialY = currentY;

    active = false;
    render();
  };

  const setTranslate = (xPos, yPos, el) => {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  };

  const drag = (e) => {
    if (active) {
      e.preventDefault();

      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, dragItem);
    }
  };

  const createText = () => {
    if (dragItem) {
      return dragItem;
    }
    dragItem = document.createElement('div');
    dragItem.setAttribute('style', 'height: 50px; width: 50px; border: 1px solid red; position: absolute; z-index: 999');
    dragItem.setAttribute('draggable', true);
    container = document.getElementById('media-manager-edit-container');
    container.addEventListener('touchstart', dragStart, false);
    container.addEventListener('touchend', dragEnd, false);
    container.addEventListener('touchmove', drag, false);
    container.addEventListener('mousedown', dragStart, false);
    container.addEventListener('mouseup', dragEnd, false);
    container.addEventListener('mousemove', drag, false);
    container.append(dragItem);
    const textEl = document.createElement('p');
    textEl.id = 'text';
    dragItem.append(textEl);
    return dragItem;
  };

  const write = (e) => {
    text = e;
    createText();
    document.getElementById('text').textContent = text;
    render();
  };





  const initRotate = () => {
    const funct = () => {
      // The number input listener
      document.getElementById('jform_addText').addEventListener('input', ({ target }) => {
        write(target.value);
      });
    };
    setTimeout(funct, 1000);
  };

  Joomla.MediaManager.Edit.text = {
    Activate(mediaData) {
      // Initialize
      console.log('init');
      initRotate(mediaData);

    },
    Deactivate() {
    },
  };
})();
