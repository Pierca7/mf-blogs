const loadRemoteEntry = async (name: string): Promise<void> => {
    await __webpack_init_sharing__('default');

    // @ts-ignore
    const container = window[name];

    await container.init(__webpack_share_scopes__.default);
}

export default loadRemoteEntry;