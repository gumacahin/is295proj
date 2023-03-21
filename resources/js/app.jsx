import './bootstrap';
import '../css/app.scss';

import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Theme } from "@carbon/react";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        render(
            <Theme theme="g100">
                <App {...props} />
            </Theme>, el);
    },
    progress: {
        color: '#4B5563',
    },
});
