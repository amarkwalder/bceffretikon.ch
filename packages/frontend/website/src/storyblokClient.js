import StoryblokClient from 'storyblok-js-client';

const client = new StoryblokClient({
    accessToken: 'K546hvvLEVz0ErOVDQX8MQtt',
});

export const defaultRequestConfig = {
    version: 'draft',
};

export default client;
