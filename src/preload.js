
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  
  platform: {
    isLinux: process.platform === 'linux',
    isMacOS: process.platform === 'darwin',
    isWindows: process.platform === 'win32',
    platform: process.platform
  },

  common: {
    
    getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
    startFirebaseAuth: () => ipcRenderer.invoke('start-firebase-auth'),
    firebaseLogout: () => ipcRenderer.invoke('firebase-logout'),

      quitApplication: () => ipcRenderer.invoke('quit-application'),
      openExternal: (url) => ipcRenderer.invoke('open-external', url),

      onUserStateChanged: (callback) => ipcRenderer.on('user-state-changed', callback),
      removeOnUserStateChanged: (callback) => ipcRenderer.removeListener('user-state-changed', callback),
  },

  apiKeyHeader: {
    
    getProviderConfig: () => ipcRenderer.invoke('model:get-provider-config'),

    getLocalAIStatus: (service) => ipcRenderer.invoke('localai:get-status', service),
    installLocalAI: (service, options) => ipcRenderer.invoke('localai:install', { service, options }),
    startLocalAIService: (service) => ipcRenderer.invoke('localai:start-service', service),
    stopLocalAIService: (service) => ipcRenderer.invoke('localai:stop-service', service),
    installLocalAIModel: (service, modelId, options) => ipcRenderer.invoke('localai:install-model', { service, modelId, options }),
    getInstalledModels: (service) => ipcRenderer.invoke('localai:get-installed-models', service),

    getOllamaStatus: () => ipcRenderer.invoke('localai:get-status', 'ollama'),
    getModelSuggestions: () => ipcRenderer.invoke('ollama:get-model-suggestions'),
    ensureOllamaReady: () => ipcRenderer.invoke('ollama:ensure-ready'),
    installOllama: () => ipcRenderer.invoke('localai:install', { service: 'ollama' }),
    startOllamaService: () => ipcRenderer.invoke('localai:start-service', 'ollama'),
    pullOllamaModel: (modelName) => ipcRenderer.invoke('ollama:pull-model', modelName),
    downloadWhisperModel: (modelId) => ipcRenderer.invoke('whisper:download-model', modelId),
    validateKey: (data) => ipcRenderer.invoke('model:validate-key', data),
    setSelectedModel: (data) => ipcRenderer.invoke('model:set-selected-model', data),
    areProvidersConfigured: () => ipcRenderer.invoke('model:are-providers-configured'),

    getHeaderPosition: () => ipcRenderer.invoke('get-header-position'),
    moveHeaderTo: (x, y) => ipcRenderer.invoke('move-header-to', x, y),

    onLocalAIProgress: (callback) => ipcRenderer.on('localai:install-progress', callback),
    removeOnLocalAIProgress: (callback) => ipcRenderer.removeListener('localai:install-progress', callback),
    onLocalAIComplete: (callback) => ipcRenderer.on('localai:installation-complete', callback),
    removeOnLocalAIComplete: (callback) => ipcRenderer.removeListener('localai:installation-complete', callback),
    onLocalAIError: (callback) => ipcRenderer.on('localai:error-notification', callback),
    removeOnLocalAIError: (callback) => ipcRenderer.removeListener('localai:error-notification', callback),
    onLocalAIModelReady: (callback) => ipcRenderer.on('localai:model-ready', callback),
    removeOnLocalAIModelReady: (callback) => ipcRenderer.removeListener('localai:model-ready', callback),

    removeAllListeners: () => {
      
      ipcRenderer.removeAllListeners('localai:install-progress');
      ipcRenderer.removeAllListeners('localai:installation-complete');
      ipcRenderer.removeAllListeners('localai:error-notification');
      ipcRenderer.removeAllListeners('localai:model-ready');
      ipcRenderer.removeAllListeners('localai:service-status-changed');
    }
  },

  headerController: {
    
    sendHeaderStateChanged: (state) => ipcRenderer.send('header-state-changed', state),
    reInitializeModelState: () => ipcRenderer.invoke('model:re-initialize-state'),

    resizeHeaderWindow: (dimensions) => ipcRenderer.invoke('resize-header-window', dimensions),

    checkSystemPermissions: () => ipcRenderer.invoke('check-system-permissions'),
    checkPermissionsCompleted: () => ipcRenderer.invoke('check-permissions-completed'),

    onUserStateChanged: (callback) => ipcRenderer.on('user-state-changed', callback),
    removeOnUserStateChanged: (callback) => ipcRenderer.removeListener('user-state-changed', callback),
    onAuthFailed: (callback) => ipcRenderer.on('auth-failed', callback),
    removeOnAuthFailed: (callback) => ipcRenderer.removeListener('auth-failed', callback),
    onForceShowApiKeyHeader: (callback) => ipcRenderer.on('force-show-apikey-header', callback),
    removeOnForceShowApiKeyHeader: (callback) => ipcRenderer.removeListener('force-show-apikey-header', callback),
  },

  mainHeader: {
    
    getHeaderPosition: () => ipcRenderer.invoke('get-header-position'),
    moveHeaderTo: (x, y) => ipcRenderer.invoke('move-header-to', x, y),
    sendHeaderAnimationFinished: (state) => ipcRenderer.send('header-animation-finished', state),

    cancelHideSettingsWindow: () => ipcRenderer.send('cancel-hide-settings-window'),
    showSettingsWindow: () => ipcRenderer.send('show-settings-window'),
    hideSettingsWindow: () => ipcRenderer.send('hide-settings-window'),

    sendListenButtonClick: (listenButtonText) => ipcRenderer.invoke('listen:changeSession', listenButtonText),
    sendAskButtonClick: () => ipcRenderer.invoke('ask:toggleAskButton'),
    sendToggleAllWindowsVisibility: () => ipcRenderer.invoke('shortcut:toggleAllWindowsVisibility'),

    onListenChangeSessionResult: (callback) => ipcRenderer.on('listen:changeSessionResult', callback),
    removeOnListenChangeSessionResult: (callback) => ipcRenderer.removeListener('listen:changeSessionResult', callback),
    onShortcutsUpdated: (callback) => ipcRenderer.on('shortcuts-updated', callback),
    removeOnShortcutsUpdated: (callback) => ipcRenderer.removeListener('shortcuts-updated', callback)
  },

  permissionHeader: {
    
    checkSystemPermissions: () => ipcRenderer.invoke('check-system-permissions'),
    requestMicrophonePermission: () => ipcRenderer.invoke('request-microphone-permission'),
    openSystemPreferences: (preference) => ipcRenderer.invoke('open-system-preferences', preference),
    markKeychainCompleted: () => ipcRenderer.invoke('mark-keychain-completed'),
    checkKeychainCompleted: (uid) => ipcRenderer.invoke('check-keychain-completed', uid),
    initializeEncryptionKey: () => ipcRenderer.invoke('initialize-encryption-key') 
  },

  echoMindApp: {
    
    onClickThroughToggled: (callback) => ipcRenderer.on('click-through-toggled', callback),
    removeOnClickThroughToggled: (callback) => ipcRenderer.removeListener('click-through-toggled', callback),
    removeAllClickThroughListeners: () => ipcRenderer.removeAllListeners('click-through-toggled')
  },

  askView: {
    
    closeAskWindow: () => ipcRenderer.invoke('ask:closeAskWindow'),
    adjustWindowHeight: (winName, height) => ipcRenderer.invoke('adjust-window-height', { winName, height }),

    sendMessage: (text) => ipcRenderer.invoke('ask:sendQuestionFromAsk', text),

    onAskStateUpdate: (callback) => ipcRenderer.on('ask:stateUpdate', callback),
    removeOnAskStateUpdate: (callback) => ipcRenderer.removeListener('ask:stateUpdate', callback),

    onAskStreamError: (callback) => ipcRenderer.on('ask-response-stream-error', callback),
    removeOnAskStreamError: (callback) => ipcRenderer.removeListener('ask-response-stream-error', callback),

    onShowTextInput: (callback) => ipcRenderer.on('ask:showTextInput', callback),
    removeOnShowTextInput: (callback) => ipcRenderer.removeListener('ask:showTextInput', callback),
    
    onScrollResponseUp: (callback) => ipcRenderer.on('aks:scrollResponseUp', callback),
    removeOnScrollResponseUp: (callback) => ipcRenderer.removeListener('aks:scrollResponseUp', callback),
    onScrollResponseDown: (callback) => ipcRenderer.on('aks:scrollResponseDown', callback),
    removeOnScrollResponseDown: (callback) => ipcRenderer.removeListener('aks:scrollResponseDown', callback)
  },

  listenView: {
    
    adjustWindowHeight: (winName, height) => ipcRenderer.invoke('adjust-window-height', { winName, height }),

    onSessionStateChanged: (callback) => ipcRenderer.on('session-state-changed', callback),
    removeOnSessionStateChanged: (callback) => ipcRenderer.removeListener('session-state-changed', callback)
  },

  sttView: {
    
    onSttUpdate: (callback) => ipcRenderer.on('stt-update', callback),
    removeOnSttUpdate: (callback) => ipcRenderer.removeListener('stt-update', callback)
  },

  summaryView: {
    
    sendQuestionFromSummary: (text) => ipcRenderer.invoke('ask:sendQuestionFromSummary', text),

    onSummaryUpdate: (callback) => ipcRenderer.on('summary-update', callback),
    removeOnSummaryUpdate: (callback) => ipcRenderer.removeListener('summary-update', callback),
    removeAllSummaryUpdateListeners: () => ipcRenderer.removeAllListeners('summary-update')
  },

  settingsView: {
    
    getCurrentUser: () => ipcRenderer.invoke('get-current-user'),
    openPersonalizePage: () => ipcRenderer.invoke('open-personalize-page'),
    firebaseLogout: () => ipcRenderer.invoke('firebase-logout'),
    startFirebaseAuth: () => ipcRenderer.invoke('start-firebase-auth'),

    getModelSettings: () => ipcRenderer.invoke('settings:get-model-settings'),
    getProviderConfig: () => ipcRenderer.invoke('model:get-provider-config'),
    getAllKeys: () => ipcRenderer.invoke('model:get-all-keys'),
    getAvailableModels: (type) => ipcRenderer.invoke('model:get-available-models', type),
    getSelectedModels: () => ipcRenderer.invoke('model:get-selected-models'),
    validateKey: (data) => ipcRenderer.invoke('model:validate-key', data),
    saveApiKey: (key) => ipcRenderer.invoke('model:save-api-key', key),
    removeApiKey: (provider) => ipcRenderer.invoke('model:remove-api-key', provider),
    setSelectedModel: (data) => ipcRenderer.invoke('model:set-selected-model', data),

    getOllamaStatus: () => ipcRenderer.invoke('ollama:get-status'),
    ensureOllamaReady: () => ipcRenderer.invoke('ollama:ensure-ready'),
    shutdownOllama: (graceful) => ipcRenderer.invoke('ollama:shutdown', graceful),

    getWhisperInstalledModels: () => ipcRenderer.invoke('whisper:get-installed-models'),
    downloadWhisperModel: (modelId) => ipcRenderer.invoke('whisper:download-model', modelId),

    getPresets: () => ipcRenderer.invoke('settings:getPresets'),
    getAutoUpdate: () => ipcRenderer.invoke('settings:get-auto-update'),
    setAutoUpdate: (isEnabled) => ipcRenderer.invoke('settings:set-auto-update', isEnabled),
    getContentProtectionStatus: () => ipcRenderer.invoke('get-content-protection-status'),
    toggleContentProtection: () => ipcRenderer.invoke('toggle-content-protection'),
    getCurrentShortcuts: () => ipcRenderer.invoke('settings:getCurrentShortcuts'),
    openShortcutSettingsWindow: () => ipcRenderer.invoke('shortcut:openShortcutSettingsWindow'),

    moveWindowStep: (direction) => ipcRenderer.invoke('move-window-step', direction),
    cancelHideSettingsWindow: () => ipcRenderer.send('cancel-hide-settings-window'),
    hideSettingsWindow: () => ipcRenderer.send('hide-settings-window'),

    quitApplication: () => ipcRenderer.invoke('quit-application'),

    pullOllamaModel: (modelName) => ipcRenderer.invoke('ollama:pull-model', modelName),

    onUserStateChanged: (callback) => ipcRenderer.on('user-state-changed', callback),
    removeOnUserStateChanged: (callback) => ipcRenderer.removeListener('user-state-changed', callback),
    onSettingsUpdated: (callback) => ipcRenderer.on('settings-updated', callback),
    removeOnSettingsUpdated: (callback) => ipcRenderer.removeListener('settings-updated', callback),
    onPresetsUpdated: (callback) => ipcRenderer.on('presets-updated', callback),
    removeOnPresetsUpdated: (callback) => ipcRenderer.removeListener('presets-updated', callback),
    onShortcutsUpdated: (callback) => ipcRenderer.on('shortcuts-updated', callback),
    removeOnShortcutsUpdated: (callback) => ipcRenderer.removeListener('shortcuts-updated', callback),

    onLocalAIInstallProgress: (callback) => ipcRenderer.on('localai:install-progress', callback),
    removeOnLocalAIInstallProgress: (callback) => ipcRenderer.removeListener('localai:install-progress', callback),
    onLocalAIInstallationComplete: (callback) => ipcRenderer.on('localai:installation-complete', callback),
    removeOnLocalAIInstallationComplete: (callback) => ipcRenderer.removeListener('localai:installation-complete', callback)
  },

  shortcutSettingsView: {
    
    saveShortcuts: (shortcuts) => ipcRenderer.invoke('shortcut:saveShortcuts', shortcuts),
    getDefaultShortcuts: () => ipcRenderer.invoke('shortcut:getDefaultShortcuts'),
    closeShortcutSettingsWindow: () => ipcRenderer.invoke('shortcut:closeShortcutSettingsWindow'),

    onLoadShortcuts: (callback) => ipcRenderer.on('shortcut:loadShortcuts', callback),
    removeOnLoadShortcuts: (callback) => ipcRenderer.removeListener('shortcut:loadShortcuts', callback)
  },

  content: {
    
    onSettingsWindowHideAnimation: (callback) => ipcRenderer.on('settings-window-hide-animation', callback),
    removeOnSettingsWindowHideAnimation: (callback) => ipcRenderer.removeListener('settings-window-hide-animation', callback),    
  },

  listenCapture: {
    
    sendMicAudioContent: (data) => ipcRenderer.invoke('listen:sendMicAudio', data),
    sendSystemAudioContent: (data) => ipcRenderer.invoke('listen:sendSystemAudio', data),
    startMacosSystemAudio: () => ipcRenderer.invoke('listen:startMacosSystemAudio'),
    stopMacosSystemAudio: () => ipcRenderer.invoke('listen:stopMacosSystemAudio'),

    isSessionActive: () => ipcRenderer.invoke('listen:isSessionActive'),

    onSystemAudioData: (callback) => ipcRenderer.on('system-audio-data', callback),
    removeOnSystemAudioData: (callback) => ipcRenderer.removeListener('system-audio-data', callback)
  },

  renderer: {
    
    onChangeListenCaptureState: (callback) => ipcRenderer.on('change-listen-capture-state', callback),
    removeOnChangeListenCaptureState: (callback) => ipcRenderer.removeListener('change-listen-capture-state', callback)
  }
});