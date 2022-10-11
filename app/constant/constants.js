import appRoot from "app-root-path"

export default {
    APP_RUN_ERROR: 'FAILED TO RUN APPLICATION',
    DB_CONNECT_ERROR: 'FAILED TO CONNECT TO DB',

    INVALID_REQUEST: 'Invalid request',

    ENTITY_CREATED: 'Entity created successfully',
    ENTITY_FOUND: 'Entity found successfully',
    ENTITY_UPDATED: 'Entity updated successfully',

    NOT_FOUND: 'Entity not found',
    NOT_FOUND_SCHEMA: 'No any schema found in entity',
    NOT_FOUND_SCHEMA_FIELDS: 'No any paths(fields) found in entity',

    // project paths
    ROOT_DIR: appRoot.path,
    ROOT_VIEW_DIR: `${appRoot.path}/app/view/html`,

    // main cardano variables
    CARDANO_POLICIES_PATH: `app/service/cardano/policies`,
    CARDANO_PROTOCOL_PATH: `app/service/cardano/protocol_parameters`,
    CARDANO_SLOTS_PER_EPOCH: 5 * 24 * 60 * 60,
    CARDANO_CLI_PATH: `cardano-cli`,
    CARDANO_NETWORK: `testnet-magic 1097911063`,

    // pinata pin prefix
    CARDANO_PIN_MANAGER_PREFIX: `https://ipfs.io/ipfs`,

    // blockfrost information
    CARDANO_BLOCKFROST_MAINNET_PREFIX: `https://cardano-mainnet.blockfrost.io/api/v0`,
    CARDANO_BLOCKFROST_TESTNET_PREFIX: `https://cardano-mainnet.testnet.io/api/v0`,
    CARDANO_BLOCKFROST_API_KEY: `CmOX3myiAhTRIltFICf6puhsrtBgOApz`,

    // jwt token information
    PASSWORD_EXPIRATION_TIME: 20, // minutes
    TOKEN_EXPIRATION_TIME: '10m',
    APP_SECRET: 'LuMxqgAr6dwaw2nufBFk1cWqKz6xiTtxdlSONg95Bby0I6bo42zXT8v6bUinqEmVoQnFVakpdhdgzB4SqKz6xiTtxdlSONg95Bby0I6bo42zXT8',


    WEB3_HTTP_URL_LOCAL: `http://127.0.0.1:7545`,
    WEB3_SOCKET_URL_LOCAL: `ws://127.0.0.1:7545`,
    WEB3_HTTP_URL: `https://rinkeby.infura.io/v3/56862b2062ac4ecd8367bd30a4ca5edc`,
    WEB3_SOCKET_URL: `wss://rinkeby.infura.io/ws/v3/56862b2062ac4ecd8367bd30a4ca5edc`,

    INFURA_ID:'56862b2062ac4ecd8367bd30a4ca5edc',
    INFURA_SECRET:'eaed5dde14f647c698076ea7ae3e03ec',
}