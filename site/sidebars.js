module.exports = {
    docs: [
        'getting-started',
        {
            type: 'category',
            label: '应用开发',
            items: [
                'app/quick-start',
                'app/component',
                'app/style',
                'app/svg',
                'app/local-dev',
                'app/unit-test',
                'app/build-deploy',
            ],
        },
        {
            type: 'category',
            label: '高阶应用',
            items: [
                'advanced/config-insiders',
                'advanced/multiple-entry',
                'advanced/browsers-list',
            ],
        },
        {
            type: 'category',
            label: '配置',
            items: [
                'settings/settings',
                'settings/feature-matrix',
                'settings/build',
                'settings/dev-server',
                'settings/plugins',
            ],
        },
        {
            type: 'category',
            label: '命令行',
            items: [
                'cli/build',
                'cli/dev',
                'cli/lint',
                'cli/test',
            ],
        },
        {
            type: 'category',
            label: '插件',
            items: [
                'plugins/qiankun',
            ],
        },
        'faq',
    ],
};
