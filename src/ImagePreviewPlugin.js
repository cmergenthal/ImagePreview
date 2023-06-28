import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import ImagePreview from './components/ImagePreview';

const PLUGIN_NAME = 'ImagePreviewPlugin';

export default class ImagePreviewPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };

    

    flex.MessageBubble.Content.add(
      <ImagePreview key="ImagePreview"/>
    );

    flex.MessageBubble.Content.remove("body");


  }
}
