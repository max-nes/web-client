# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Please check our [developers guide](https://gitlab.com/tokend/developers-guide)
for further information about branching and tagging conventions.

## [Unreleased]
### Removes
- Modules:
  - `issuance-explorer`

### Fixed
- Added types to `types.spec.js`

## [1.13.0-rc.2] - 2021-02-15
### Changed
- Refactor function addBalance

## [1.13.0-rc.1] - 2021-02-09
#### Added
- New i18n-component for easier nodes interpolation
- New helpers:
  - `identity-helper.js` - Includes reusable actions over identities
  - `fees-helper.js` - Includes reusable actions over fees
- New error-message when saleLogo doesn`t added in the ShortBlurbStepForm
- New records:
  - OrderBookRecord
  - OfferRecord

### Changed
- New formers:
  - New `TransferFormer`
  - New `IssuanceFormer`
  - New `LimitsFormer`
  - New `WithdrawalFormer`
  - New `PollFormer`
  - New `SaleFormer`
  - New `InvestFormer`
  - New `TradeFormer`

#### Fixed
- A bug with `MarkdownField` length
- A bug with cancel order in `YourTradeOfferForm`
- New versions of packages:
  - lodash: 4.17.20
  - resolve-url-loader: 3.1.2
  - js-sdk: 1.14.0-rc.13
- New positions of forms:
  - DepositForm
  - SaleForm

### Removed
- Removed `issuance-form` from modules
- Removed `offer-manager.mixin` from mixins
- Removed `fees.mixin` from fees
- Removed `fees.mixin.spec` from fees

## [1.13.0-rc.0] - 2020-09-18
#### Added
- Smart App Banner
- Formers - guys that collect attributes:
  - Migrate the asset creation/update and asset request creation/update to
    the formers
  - Merge asset create and asset update requests into a single record -
    `AssetRequest`
  - Merge asset create and asset update form into a single form - `AssetForm`
- Add `jsconfig.json`
- Proxy `config` (`$config`) and `vueRoutes` (`$routes`) in Vue.prototype
  for easier access from the templates
- Browser update banner — notify the user about outdated browser
- New `KeyValues` singleton to store key value
- New helpers:
  - `signers-helpers.js` - Includes logic for creating signers set
  - `api-helpers.js` - Includes reusable actions with the API
  - `kyc-helpers` - Includes kyc-related helpers
  - `scroll-helpers.js` - At the moment only `scrollToTop()` action
  - `delay.js` - Promise version of the setTimeout
  - `date-helpers.js` - Includes reusable actions over dates
- Records:
  - New `BlobRecord`
  - New `KycRecord`
  - New `KycCorporateRecord`
  - New `KycGeneralRecord`
  - New `KycRequestRecord`
  - New `KycRequestRecord`
  - New `KycRecoveryRequestRecord`
  - New `RequestRecord` getters: `isExists`, `updatableId`

#### Changed
- `DocumentContainer`:
  - Add `isDoc()` method that checks whether the provided value looks like a doc
  - Add `fromObj()` method that creates a new `DocumentContainer` from an
    object. Or returns `null` if the creation is impossible.
- Enabled vue-devtools for 'development' env
- Used common `STELLAR_TYPES` instead of the duplicated one
- Split advanced step of the asset form into small sections
- Hide 'Atomic swaps'
- Clearer asset former collecting on advanced step
- Eslint warns about some non-critical rules (instead of breaking the build):
  "no-tabs", "singleline", "no-unused-vars"
- Extract `initApi()`, call it from the main.js, instead of App.vue
  (the api should be initialized before the App rendered)
- `loadingDataViaLoop()` => `loadAllResponsePages()`, moved to `api-helpers.js`
- Formers:
  - New `KycGeneralFormer` and `KycCorporateFormer`
  - Migrated `attrs` description from the JSDoc to predefined default values
  - Now the populating functions treat `attrs` as `undefined`
- Done migration to the `KycGeneralFormer` and `KycCorporateFormer`:
  - The general kyc form and corporate kyc form are integrated with the
    new formers
  - The kyc-recovery feature is adjusted to the new approach
  - The kyc and the kyc-recovery vuex stores were thinned
  - Getters of the kyc recovery states of the account moved to the
    account module from the kyc-recovery module to avoid confusing with
    state of the kyc recovery request
- Proxied `DOCUMENT_TYPES` via Vue prototype as `$DOCUMENT_TYPES`
- Automatic lint fixes
- `Passport.vue` uses public url of the document instead of building the own one
- Signup now uses the `signers-helpers.js` to create the signers
- `vuexTypes.LOAD_ACCOUNT`’s `accountId` arg is optional now
- Use @tokend/js-sdk@1.14.0-rc.0
- Asset card list

#### Fixed
- Stretching mobile sidebar
- Logo outside section
- Input field number validation
- availableForIssuance to number bug
- Fixed disabled and error states of the following fields:
  - `DateField`
  - `FileField`
  - `SelectField`

#### Removed
- removed `DocumentContainer` and `upload-documents.js`, (using SDK instead)
- Old key-value module
- Old `ChangeRoleRecord`
- Old `verification-form.mixin.js`
- Old verification forms and their vuex stores

## [1.12.0] - 2020-07-16

## [1.12.0-rc.6] - 2020-06-09
#### Fixed
- A bug with displaying init-loader logo in index.html

## [1.12.0-rc.5] - 2020-06-03
#### Fixed
- A bug with vue-router

## [1.12.0-rc.4] - 2020-06-03
#### Fixed
- A bug with package.json

## [1.12.0-rc.3] - 2020-06-03
#### Fixed
- A bug with package.json

## [1.12.0-rc.2] - 2020-06-02
#### Added
- Redirect type invite-verify
- Transfer, withdraw and issuance forms disabling if balance is 0
- Validation to registration, sign in, recovery, change password input fields

#### Fixed
- redirect types
- number input field
- Bug with max value of amount input field for deposit
- A bug with wrong displaying asset code in requests asset creation table
- A bug when after update opened buy offer changed type to sell
- Visibility of select field options on top-bar if width < 768px
- Bug with displaying correct unlocked amount in movements
- Text align in security tab in settings for mobile
- A bug with env config

#### Changed
- Hide "Send" button for non-transferable asset

## [1.12.0-rc.1] - 2020-03-25
#### Added
- Horizontal scroll for request's titles for mobile
- Max length to withdraw address' input field

#### Fixed
- En text in ru localization
- Buttons positions in confirmation form for mobile
- Text overflow of input field labels if text is too long for mobile
- Width of account types in verification form for mobile
- Width of tabs in poll's drawer for mobile
- Buttons dimensions in movements for mobile
- Aspect ratio of asset logo
- A bug with auto select no balance asset in CreateTradeOfferForm
- A bug with absence limit select date start time in sale request
- A bug with wrong avatar display in Passport
- A bug with wrong display deposit form
- A bug with wrong display topBar with selectField on smartphone
- A bug with display button change limits for unverified account
- Disabled input field and button in invest form when balance is 0
- A bug with impossibility use a comma as a separator in Firefox browser

## [1.12.0-rc.0] - 2020-03-16
#### Added
- New build configuration

#### Removed
- `SupportedBrowsers` component

## [1.11.0] - 2020-03-16

## [Unreleased]
#### Fixed
- A bug with wrong calculate price per one asset in immediate sales

#### Removed
- load-asset-pairs tests

## [1.11.0-rc.2] - 2020-03-11
#### Fixed
- Tooltip displaying

#### Removed
- Unused tooltip.js

#### Added
- 'required' to limits form validation
- 'min' and 'max' values to limits form

## [1.11.0-rc.1] - 2020-03-05
#### Fixed
- Trailing digits in amount input field
- Corporate KYC "Team size" warning NaN
- The limits input field accepts values that differ from the numbers
- A bug with incorrect display movement amount value with fees
- A bug with displaying in one line very long poll question and answers
- A bug with displaying in one line very long subject
- Some mistakes in russian localization

#### Added
- Error message when input amount is less than min amount

#### Changed
- REFERENCE_MAX_LENGTH from 255 to 64

## [1.11.0-rc.0] - 2020-02-05
#### Fixed
- A bug with color scheme
- A bug with reload data on Dashboard, Sales and Trade pages
- A bug when submit order form closed after reload data

#### Removed
- All schemes

## [1.10.3] - 2019-10-24

## [1.10.3-rc.2] - 2019-10-24
#### Added
- Trim for input field

#### Fixed
- A bug when the user can not update asset with deposit withdraw integration

#### Changed
- Moved logo and favicon to branding folder

### "Under the hood" changes
#### Added
- `APP_NAME` in config
#### Changed
- Now using @tokend/js-sdk@1.11.0-rc.0

## [1.10.3-rc.1] - 2019-10-18
#### Fixed
- A bug when the user can not enter a value in input-field with type 'number' on Firefox
- A bug with infinite loading of the page "Register of shares"

#### Changed
- Color scheme improvements

## [1.10.3-rc.0] - 2019-10-11
#### Added
- Integration with Erc20 and stellar

#### Fixed
- Asset creation with zero initial pre-issued amount

## [1.10.2] - 2019-09-26

## [1.10.2-rc.0] - 2019-09-16
#### Added
- New sale types

## [1.10.1] - 2019-09-09

## [1.10.1-rc.1] - 2019-09-06
#### Fixed
- A bug with quote asset code in atomic swap

## [1.10.1-rc.0] - 2019-09-05
#### Added
- Buying atomic swaps
- Missed russian translation
- `identities.module` to avoid reloading users identities

#### Fixed
- A bug when withdrawal form not closed after successfull operation

#### Changed
- Call `loadPendingAtomicSwapBidRequests` method after success submit
- In `identity-getter.js` replace method `getAccountIdByEmail` to `getAccountIdByIdentifier`

## [1.10.0] - 2019-08-12

## [1.10.0-rc.7] - 2019-08-09
#### Fixed
- Displaying fee loader in `withdrawalForm`

## [1.10.0-rc.6] - 2019-08-07
#### Fixed
- A bug when cannot display deposit address

## [1.10.0-rc.5] - 2019-08-06
#### Fixed
- A bug when cannot deposit

## [1.10.0-rc.4] - 2019-08-02
#### Fixed
- A bug when you cannot return from "Downloads" if the tab was opened in new tab
- A bug when page reload twice
- A bug when user cannot sign out
- A bug when don't update logout time

#### Removed
- Delay refresh list timeout
- Use stellar when create new asset

#### Added
- Autoclose indicator to status-messages

### "Under the hood" changes
#### Added
- New config keys:
  - `PLAY_MARKET_LINK`
  - `OFFLINE_ISSUANCE_WIN_LINK`
  - `OFFLINE_ISSUANCE_MAC_LINK`
  - `OFFLINE_ISSUANCE_SOURCE_LINK`
- Empty message placeholder for My assets page
- `ErrorTracker.setLoggedInUser`to `SET_ACCOUNT`, `CLEAR_STATE` and `SET_WALLET`
  mutations

#### Changed
- If some of the config keys are empty, the related images and links will not
  be rendered. Affects the following keys:
  - `IOS_MANIFEST_LINK`
  - `PLAY_MARKET_LINK`
  - `OFFLINE_ISSUANCE_WIN_LINK`
  - `OFFLINE_ISSUANCE_MAC_LINK`
  - `OFFLINE_ISSUANCE_SOURCE_LINK`
- Now using @tokend/js-sdk@1.9.0-rc.2

#### Removed
- `RECOVERY_MODE` config key due to unused anymore
- `ErrorTracker.setLoggedInUser` from App.vue and LoginForm.vue

## [1.10.0-rc.3] - 2019-07-22
#### Added
- New 'Explore atomic swaps' page

#### Removed
- Conto leftovers from vanilla

#### Fixed
- Issue when a user could not create an atomic swap if an amount is less than
  an available balance
- Overflow clipboard-field on tfa form

## [1.10.0-rc.2] - 2019-07-18
#### Added
- Real time updates on all pages
- `LOG_IN` and `LOG_OUT` vuex actions
- New `LOG_IN` action

#### Changed
- Rename `LOG_IN` action on `RESTORE_SESSION`

#### Removed
- Recovery seed screen on sign up
- Remove recovery signer from KYC recovery request building
- Remove recovery seed screens on auth

#### Fixed
- Bug about maximum call stack in buildKycRecoveryPageGuard

## [1.10.0-rc.1] - 2019-07-17
#### Added
- Real time updates on all pages
- Set up support of multiple languages

#### Changed
- Hide fees report if no fees present. Not all screens affected yet

#### Fixed
- Now "Show password" buttons do not participate in tab order

### Experimental features changes
#### Added
- Simplify form of create new sale (Conto)
- Simplify pages for sale details (Conto)

## [1.10.0-rc.0] - 2019-07-16
#### Added
- Perform issuance operation in the "Create atomic swap" form for asset owner
  if he doesn't have enough money

#### Fixed
- Resolved an issue with extra trailing whitespace appeared in clipboard field
  component

### "Under the hood" changes
#### Added
- Validation case `atomicSwap` in `AmountInputField` component
- Handler for new deposit address

#### Changed
- Now using @tokend/js-sdk@1.9.0-rc.1

## [1.10.0-x.2] - 2019-07-15
#### Fixed
- Resolved a KYC recovery issue of unverified account where the request has
  been sent but the screen was continued been showing blank
- Resolved a small design issue on KYC recovery TFA form when hint text was
  too close to the input field

## [1.10.0-x.1] - 2019-07-12
#### Added
- KYC Recovery
- Integration with session key server

#### Fixed
- Resolved an issue when in select field quote assets on the atomic swap form
 show only assets in user balance
- Fixed display price on form when create new sale
- Resolved an issue with undisplayed favicon

### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.9.0-rc.0

## [1.10.0-x.0] - 2019-07-02
#### Added
- New Atomic swap feature:
  - Create atomic swap form
- `canBeBaseInAtomicSwap` and `canBeQuoteInAtomicSwap` policy for assets

### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.9.0-x.0

### Experimental features changes
#### Added
- New use case - conto

## [1.9.1] - 2019-07-15
#### Changed
- Allow sale cap asset to be picked as quote asset. Was: cap asset was
  assigned automatically as a quote asset.

## [1.9.0] - 2019-07-10

## [1.9.0-rc.1] - 2019-07-08
#### Fixed
- Resolved an issue when has absent margin and present label overlap on
  limits changing form
- Resolved an issue when you can set amount bigger than max asset’s amount
- Resolved an issue when limits leftover amount was not updated
- Resolved an issue when poll failed to load for a user that is not sale owner
- Resolved an issue when participant emails did not show on the "Participants"
  tab
- Resolved an issue when the user could not update a sale request

## [1.9.0-rc.0] - 2019-06-24
#### Added
- New "My assets" page
- New "Register of shares" page
- New page scroll to top behavior after KYC corporate request submitting
- New a bit restyled version of select and checkbox fields to use them as
  filters
- New Voting feature:
  - Create poll form
  - Create poll requests pages
  - Poll exploration pages
  - Poll manage forms
  - Poll vote form
- Stellar integration

#### Changed
- Reordered sidebar menu items
- Fixed some style issues with radio button and checkbox fields

#### Fixed
- Resolved an issue when the email verification still had been in progress but
  the users was redirected to the application
- Resolved an issue when select field was displayed glitchy if no value selected
- Resolved an issue when disabled or readonly select field was rendered slightly
  differ from other fields
- Resolved an issue when date field was disabled after submit form
- Issue with tooltip displaying inside elements with own scroll
- Resolved an issue when tick field was displayed not checked if value checked

### "Under the hood" changes
#### Added
- DMYT (DD.MM.YYYY at TIME) and calendar inline (like normal calendar but words
  start from small letter) i18next filters
- `@mixin multi-line-ellipsis` — scss mixin for easily setting up ellipsis of
  multiline blocks
- `width` property to skeleton loader for more flexible width setup
- Now config urls are insensitive for presence of absence of trailing slash
- New asset code validation rule
- New account id validation rule

#### Changed
- Now loading KYC latest data from account endpoint
- Now loading latest KYC data from account endpoint instead of the latest
  request endpoint when possible

#### Removed
- Get rid of some ineffective style-lint rules

### Experimental features changes
#### Changed
- Accept investments in `isBaseAsset` assets for create opportunity form

## [1.8.0] - 2019-06-22
### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.8.0

## [1.8.0-rc.3] - 2019-06-21
#### Fixed
- Resolved an error of inexistent CODE_MAX_LENGTH thrown on open of asset
  creation form
- Resolved an issue of wrongly displayed asset type in asset attributes viewer
  on "Assets" page
- Stopped overriding of user input when entered value was lesser than "min"
  attribute of the field
- Resolved an issue when "0" was displayed instead of current balance value in
  withdrawal form

## [1.8.0-rc.2] - 2019-06-17
#### Changed
- Disable withdraw for unverified users

#### Fixed
- Display of "add to balance" button in asset attributes
- Fixed timeout of status message self-close
- Bug when "Balance is invalid" error appeared on withdraw submitting

### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.8.0-rc.1

## [1.8.0-rc.1] - 2019-06-07
#### Changed
- Some design improvements to fields and rendered fees:
  - Fields are now synchronized in disabled colors and style
  - Text areas now have thinner border-width
  - Tick field now looks a bit nittier
  - Rendered fees now have less obtrusive underlines on clickable part
  - Rendered fees now have a bit smaller font-sizes and line-heights
  - Rendered fees now have "Show my account fees" at the bottom of the component

### "Under the hood" changed
#### Added
- File types exceptions to .gitattributes
- Balances panel to the invoice form (Loyalty)

#### Changed
- Invoice form width to full screen
- Now displaying customer's & merchant's balances on the invoice form
  confirmation

#### Fixed
- Restored images line endings

### Experimental features changes
#### Added
- Balances panel to the invoice form (Loyalty)

#### Changed
- Invoice form width to full screen
- Now displaying customer's & merchant's balances on the invoice form
  confirmation

## [1.8.0-rc.0] - 2019-06-06
#### Fixed
- Disabled state for amount input field
- Minimum & maximum normalization for input field
- Displaying balance on assets page
- Displaying no data row on fees table
- Hiding of "My sales" tab for non-corporate users
- Selecting asset on deposit form
- Displaying balances on assets page

### "Under the hood" changes
#### Added
- Asset code validator

#### Changed
- Now loading private document URL in file field
- Updated package.json packages
- Now using @tokend/js-sdk@1.8.0-rc.0

## [1.8.0-x.3] - 2019-06-05

## [1.8.0-x.2] - 2019-06-05
#### Fixed
- Bug with investing in sale

## [1.8.0-x.1] - 2019-06-05
#### Added
- Skeleton loading

## [1.8.0-x.0] - 2019-06-05
#### Added
- Placeholder of empty list for Trade, Issuance requests and Requests pages
- Browser compatibility check and unsupported browser page
- Password toggle button for input fields with type="password"
- Unify displaying of fees
- Displaying fees on issuance form & trade forms
- Display amount sum (amount + fee) in movements list
- Max button to some input fields

#### Changed
- Route-to-route progress bar size and color
- Status message slightly redesigned
- Update "Learn more about pre-issuance" link style on sale creation form
- Now top bar buttons in movements page are conditionally disabled, not hidden
- Now including offer fees to account's balance on invest form
- Create sale form improvements:
  - Added cap asset field to the create sale form
  - Now using cap asset as default quote asset for create sale request
  - Now creating quote asset balances on create sale form if they don't exist
  - Now displaying accepted investment assets as base assets of pairs where
    cap asset is quote asset on create sale form
- Now displaying invest form on the sale state widget
- New using date format 'dd/mm/yyyy' instead of 'yyyy-mm-dd' in date fields
- Now allowing the user to input birth date manually on general
  verification form
- Now displaying asset in incoming withdrawal requests list

#### Removed
- Cursor pointer on disabled select
- Price history chart from sale overview page
- "Required" validation for address line 2 on corporate KYC form
- Displaying of Fixed fee from invest form

#### Fixed
- Don't show additional info title in kyc status message, if no additional
  external information provided
- Successful investment sale state update
- Break words in sale description viewer
- Fix labels for submit general kyc button
- Disabling invest form while submitting
- Closing of transfer drawer on Dashboard after submitting form
- Auto-select of asset in drawers on movements page
- Translations on sale details drawer
- A bug when "My Sales" tab shown for non-corporate accounts

### "Under the hood" changes
#### Added
- Tooltip directive
- Assets vuex module for loading and storing all the assets
- Whitelisted indicator on sale related modules
- isTransferable policy getter to asset records
- Usage of Unix line endings rule
- `assets.module`
- `AmountInputField`
- "custom-select" package for displaying customized select field
- "compare" & "format" methods to `MathUtil` class
- `name` attributes to 2FA form inputs
- Emitted value normalizers for input field:
  - "normalizeRange"
  - "normalizeDecimalPrecision"

#### Changed
- Now loading account converted balances in
  "LOAD_ACCOUNT_BALANCES_DETAILS" vuex action
- Now calling "UPDATE_ASSET" mutation in the
  "LOAD_ACCOUNT_BALANCES_DETAILS" action
- Now using `DocumentsManager` from SDK to upload documents to the storage
- Now getting document URL using documentsManager
- Now using `MathUtil.compare` method in validators
- Now using `MathUtil.format` for formatting money, numbers, and percents
- Now passing values to select field using a slot and "option" tags

#### Removed
- "numeral" package
- Unused order number format & filter

#### Fixed
- 'data' error in asset request list
- Calendar related tests for win32 systems
- Different borders with attribute of readonly on the field

## [1.7.0] - 2019-06-03
### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.7.0

## [1.7.0-rc.4] - 2019-05-30
#### Fixed
- Bug with unhidden "My sales"

## [1.7.0-rc.3] - 2019-05-30
#### Fixed
- Hide "My sales" tab for non-corporate users
- Fix Create/Update button text on general KYC verification form
- Add missing asset type translation to sale asset details

### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.7.0-rc.2

## [1.7.0-rc.2] - 2019-05-21
### "Under the hood" changes
#### Changed
- Some DevOps stuff changed

## [1.7.0-rc.1] - 2019-05-21
### "Under the hood" changes
#### Changed
- Some DevOps stuff changed

## [1.7.0-rc.0] - 2019-05-21
#### Added
- New sale whitelist support:
  - New "Whitelisted" checkbox on create sale form
  - New "Whitelisted" row to sale details drawer
  - New whitelist invitation form (shown only for the sale owner)
  - New whitelist invitations drawer
- New loading feedback when moving from one route to another (nprogress loader)
- New "Copied" tooltip message to copy icon-buttons
- New "Total" read-only field in offer creation form
- New Sentry error tracking integration
- New pre-issuance guide and links to it from pre-issuance related features
- New sale participation statistics drawer, shown only for the sale owner
- Now displaying up to three user balances in dropdown when click on user’s
  avatar at top-right of the screen
- Restored email validation on login form

#### Changed
- File field look improvements:
  - Added reactions to drag and drop actions
  - Added image preview
  - Added icons for non-image filetypes
  - Added upload icons
  - Now gray-scale painting the field when its state is disabled
  - New validation of file extension, size and dimensions in file field
- Dashboard movements changes:
  - Added "Latest activity" label
  - Now showing only 10 latest operations
  - Removed "More" button
- Now formatting date in validation message of fields with min date restriction
- Now restricting max size of uploaded files to 32mb
- Merged "Requires verification" and "Is security (requires accreditation for US
  residents)" into "Deposit method" row in asset details drawer
- New 'no-data' message for Movements, Fees and Limits table
- Now showing more highlighted disabled investing reason in Invest form
- Updated wordings:
  - Change "Account address" to "Account ID" on "Settings" page
  - Add recommendation of using Google Authenticator to 2FA screen
  - Fix typo with "some assets" on the Deposit form
- Now showing expiration date of deposit address on the Deposit form
- Moved sale view buttons:
  - Invest button to the block with investment statistics
  - View details button to under the sale heading
- Renamed "All sales" -> "Investable sales"

#### Fixed
- Added missing formatting of asset code and value to asset details drawer
- Fix a bug with chart on-hover tip when price up from 0 to some value: instead
  of "+Infinity%" now showing "+100%"
- Fixed a bug when users requesting limits changing to unlimited values
- Fixed a bug when users receive "Your transaction is invalid" if the submitted
  transaction had exceeded limits
- Fixed a bug of uploading documents on general verification form
- Fixed a bug of incorrectly shown disabled state of account type selector on
  verification page
- Some typos in EN translations
- Fixed an issue with 0 instead of converted balance on Dashboard
- Fixed an issue with displaying quote asset as currency on the line chart
- Fixed a bug that caused "Update" button to never be shown in asset details
  drawer
- Fixed displaying of sale & create sale request caps
- Bug with getting 'defaultQuoteAsset' code in the sale creation form
- Fixed annoying flickering on update on "Trade" page

#### Removed
- Removed restriction of creating sales in the past (and opportunities for REIT
  experimental feature
- Removed "dev: " prefix from displayed version

### "Under the hood" changes
#### Added
- New `BalanceNotFoundError` to the runtime errors
- New `initSync()` method to Api class
- New `MessageBox` component for displaying titled messages
- New `SALE_DEFINITION_TYPES` constant

#### Changed
- Modularized:
  - Pre-issuance form
  - Issuance form
  - Create sale form
- Now using @tokend/js-sdk@1.7.0-rc.1
- Split offer creating drawer to three new drawers
- Optimized fonts, images, SVGs
- Now using `moment().toISOString()` value instead of `moment().toString()
- Now performing actions with wallets & factors using relevant managers
- Moved horizon resources to "/v3" endpoints
- .babelrc: babel target to allowed browsers
- Now loading converted balances on the balances page
- Moved exceeding sale cap message to vuelidate error messages
- Now loading default quote asset in create sale form
  endpoint
- Clean up:
  - Now using global api.js in all modules instead of the local analogues
  - Removed wallet provided via prop to each module
  - Import api instead of Api in security page
  - Remove _config.js from modules
  - Remove storageUrl from modules
  - Now processing documents & blobs using new ApiCaller

#### Removed
- Removed unused:
  - `CreateSaleForm` component
  - `PreIssuanceForm` component
  - `requests-renderer` component
  - `mock-helper.js` unused methods
  - `DocumentContainer` unused methods
  - global SDK instance

#### Fixed
- `event.getModifierState` error on auth page
- Account balances mapping in deposit form

### Experimental features changes
#### Fixed
- Show drawer for `isDepositable` in movements-top-bar-reit

## [1.6.0] - 2019-05-09
#### Changed
- Enabled updating of pending and approved corporate kyc requests
- "Submit" btn on verification changed to "Create request" or "Update", depends
  on whether the request updatable or not

#### Fixed
- Fetching of investment fees in investing forms

### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.6.0

## [1.6.0-rc.0] - 2019-05-02
#### Added
- Displaying of fees in invest form
- Displaying of a banner with block reason on every screen (for blocked users only)
- New advanced general verification form (vanilla only)
- New US verified and US accredited account roles support
- New "Security" asset type

#### Changed
- Now does not show multiple QR codes on Coinpayments deposit

#### Fixed
- Validator of available for issuance amount on sale creation form

### "Under the hood" changes
#### Added
- `usVerified` and `usAccredited` roles to key-value module
- New release sanity check script, run it on pre-push

#### Changed
- Now using @tokend/js-sdk@1.6.0-rc.0

#### Fixed
- Invalid opts of `preissuedAssetAmount` when creating an asset

## [1.6.0-x.2] - 2019-04-29
#### Added
- Re-render chart animation

#### Changed
- Now opening pre-issuance details link in new tab

### Experimental features changes
#### Fixed
- Deposit fiat drawer displaying on REIT

## [1.6.0-x.1] - 2019-04-26
#### Added
- Selected asset query parameter to URL on dashboard, movements,
  limits, and fees pages

#### Changed
- Now using more modern animation for init loader
- Now showing all the received points (360) on the chart
- Now showing zero axis line, if chart has both negative and
  positive values
- Now using default d3 ticks calculation on chart axes, so the ticks count and
  positions are not fixed now and ticks have more user-friendly values

#### Fixed
- Account verification using received link from e-mail

### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.6.0-x.0
- Now using "app__button-..." classes instead of button mixins

### Experimental features changes
#### Changed
- Now selecting invoice point by loyalty account number (Loyalty)

## [1.6.0-x.0] - 2019-04-24
#### Added
- Copy button next to email values

#### Removed
- Quitted building sourcemaps for production

#### Fixed
- Fixed calculating of percent delta on line chart
- Fixed displaying of negative values on line chart
- Fixed bunch of date field issues:
  - Broken "disabled" state
  - Broken manual input. If the user input invalid date manually the field
    cleans up
  - Broken key events (enter, escape, arrow navigation)
- Fixed margin of Limits page, added "Current limits" subheading

### "Under the hood" changes
#### Changed
- Now running WDS on a nearest non-busy port. No more `EADDRINUSE` for us
- Flatpickr implementation now not via [vue-flatpickr-component](https://www.npmjs.com/package/vue-flatpickr-component),
  but via pure [flatpickr](https://www.npmjs.com/package/flatpickr) library

#### Fixed
- Fixed a bug when with initial app configuration loading at the start if the
  user was logged in but the session still not expired
- Fixed a bug with absent preloading of account balance in Coinpayments deposit
  form
- Make `<email-getter>` be inlined flex

### Experimental features changes
#### Added
- Receivable distribution chart (Loyalty)
- Receivable-payable delta chart (Loyalty)
- Account number field to the invoice form (Loyalty)

#### Changed
- Use select field instead of table for acceptable points on
  create invoice form (Loyalty)
- Now sending payment transaction to the external system instead of
  creating a blob (Loyalty)
- Corrected statistics charts data (Loyalty)

#### Fixed
- Polling when creating an invoice (Loyalty)
- Invoice transaction source account (Loyalty)
- Displaying incoming withdrawal requests (Loyalty)

## [1.5.0] - 2019-04-19
### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.5.0

## [1.5.0-rc.3] - 2019-04-19
### "Under the hood" changes
#### Changed
- Now using @tokend/js-sdk@1.5.0-rc.1

## [1.5.0-rc.2] - 2019-04-19
#### Added
- Displaying of limit request details in drawer

#### Changed
- Show limits request list on top of other limits on "Limits" page
- "Issuance" labels on Issuance page renamed to "Issuance requests"

#### Removed
- Dupe team size and website fields on corporate verification
- Displaying investors quantity in sale details
- Opera from noscript

#### Fixed
- Fixed a bug with unsubmitted transfer form
- Fixed a bug with displaying verification state message
- Fixed a bug with displaying "undefined" instead of quote asset in
  dashboard’s chart
- Fixed a bug with unreadable QR code on "Downloads" page
- Fixed a bug with undisplayed verification code on general KYC form
- Fixed a bug with incorrect displaying of fees paid for recipient while
  in transfer form

### "Under the hood" changes
#### Changed
- Now getting blob types from SDK
- Now using /v3 API for getting sales
- `SaleRecord` is now parsing the resource from new API

#### Removed
- Statistics property from `SaleRecord`
- Buttons' "form" attributes

## [1.5.0-rc.1] - 2019-04-17
#### Added
- Displaying of blocked account role
- Displaying of permanently rejected verification request state

### "Under the hood" changes
#### Changed
- Now loading KYC requests in the parent verification component
- Now getting latest approved request ID in creator details of the latest
  change role request, and loading the related request itself if account
  was reset or blocked

## [1.5.0-rc.0] - 2019-04-16
#### Added
- Displaying of feedback message after successful verification request submitting
- Displaying of available base asset amount on sale creation form
- Displaying of issuance status in issuances list
- Polling ticker of order book
- URL validation of Homepage field of corporate verification form
- User auto-logout on idle activity
- Auto-populating of limit change request forms
- Two-factor validation on login & change password forms
- Enabling/disabling 2FA form in "Settings" page
- Disclaimer message about pre-issuance asset signer if press "Use mine" button

#### Changed
- Movement list items displaying changes:
  - Display total fee
  - Display operation summary (type, operation and date)
  - Display fee information only if total fee is bigger than zero
- Redesigned recovery seed page:
  - Added warning message
  - Some minor design adjustments
  - Use redesigned clipboard field with a bit darken background
- Redesigned verification state message
- Redesigned clipboard field
- Redesigned feedback status message
- Renamed "Fund(s)" to "Sale(s)" and "Token(s)" to "Asset(s)"
- Renamed "Pre-issued asset signer" to "Pre-issuance asset signer"
- Hide "Withdraw" and "Deposit" buttons accordingly to selected assets’ policies
  on "Movements" page
- Increased width of "Already in your balances" to prevent its wrapping
- Made warning color (orange) a bit brighter
- Now support inserting both of YouTube video link and YouTube video ID on
  sale creating form
- Now sorting balances on "Balances" page in desc order by total balance
  converted to default quote asset

#### Removed
- "Fee" column from the movements table

#### Fixed
- Fixed disabled state of form stepper tabs, disallow attending of pass steps
- Fixed a bug with animation flickering on drawer closing
- Fixed displaying of insufficient/absent balance message on submit trade
  offer form
- Fixed converted balance displaying on "Dashboard" page
- Fixed invalid matched fee calculation in invest form
- Fixed trade history tables top margin
- Fixed displaying of input field label in Firefox browser
- Reworded "Verification required" translations on invest form
- Reworded warning message about insufficient balance in the "Invest" form

### "Under the hood" changes
#### Added
- QR code plugin wrapper
- Default quote asset fetching from the server

#### Changed
- Now using @tokend/js-sdk@1.4.4
- Modularized:
  - Update asset form
  - Create asset form
  - Update asset form
  - Asset explorer
  - Balance explorer
  - Create asset requests
  - Update asset requests
  - Create sale requests
  - Pre-issuance requests
  - Incoming withdrawal requests
- Moved ticker interval to a config and apply it for all tickers within the app
- Moved movements modules translation filters to a mixin
- Extracted verification state message to a separate component
- Now using "qrcode.vue" package instead of "vue-qr"
- Now getting previous account role from previous KYC request instead of
  `creatorDetails` of approved reset request
- Now using main signers account id instead of accounts account ID for
  setting pre-issuance asset signer

#### Removed
- `DEFAULT_QUOTE_ASSET` field from config
- Common records wrappers:
  - `RecordWrapper` factory
  - `AssetCreateRequestRecord`
  - `AssetUpdateRequestRecord`
  - `WithdrawalDetailsRequestRecord`
  - `PreIssuanceCreateRequestRecord`
  - `SaleRequestRecord`
- Constants of horizon version prefix
- Hard-coded `REQUEST_TYPES` constant
- ID attributes from forms & charts

### Experimental features changes
#### Added
- Subject field to the create invoice form (Loyalty)
- Displaying invoice summary on create invoice form (Loyalty)
- Coinpayments deposit drawer (Reit)
- Withdrawal drawer (Reit)

#### Changes
- Now using 2 decimal points for invoice amounts (Loyalty)
- Now using "EUR" asset instead of "PET" one on the loyalty statistics
  charts (Loyalty)
- Moved redeem offer creation from the global mixin to the local store
  (UTH, Reit)

#### Removed
- Removed Transfer & deposit from the loyalty points reconciliation scheme
  (Loyalty)
- Removed useless fields and getters in the Redeem `Sale` and `Asset` records

#### Fixed
- Translations for loyalty points merchant module (Loyalty)
- Setting merchant account ID to invoice URL (Loyalty)
- Fixed bug with validation of maturity date (Reit)
- Fixed bug with getting asset pair price in opportunity creation form. Now
  opportunity creation should work for both inverted and straight asset pairs.
  (Reit)

## [1.4.0] - 2019-04-05

## [1.4.0-rc.3] - 2019-04-04
#### Fixed
- Withdrawal request creating where invalid creatorDetails were submitted

## [1.4.0-rc.2] - 2019-04-02
#### Fixed
- A bug with uneditable general verification form for brand-new users

## [1.4.0-rc.1] - 2019-04-02
#### Added
- Updating of movements list and balances on Dashboard page after transfer
  performed
- Updating of movements list on "Movements" page after transfer performed

#### Changed
- Change default chart scope to "Day"
- Swap order book and trade history on "Trades exchange" page

## [1.4.0-rc.0] - 2019-04-01
#### Added
- Improvements of input fields:
  - Added ellipsis of overflowed text
  - Added "CapsLock enabled" warning for fields with "password" type
- TokenD loading spinner at application initialization
- Trade offers cancellation in "My orders" tab on "Trade" page
- Displaying of asset policies and asset type to asset details drawer
- Confirmation before token creation request canceling
- Polling tickers:
  - Charts now poll prices
  - Passport now poll account and KYC
- Message for users with JavaScript switched off or browsers that don’t support
  JavaScript
- Client withdrawable requests:
  - Show withdrawal reviewer email address in withdrawal form
  - Added "Incoming withdrawal" tab to "Requests" page
- User avatar upload. Both general and corporate users can upload avatars
- "Closed X days ago" text for sales that were ended
- Account reset client-side support. Now showing banners with "Your account was
  reset due to X reason". Previous KYC form should be automatically populated.
- Coinpayments-deposit module (client-side integration with Coinpayments)
- Allow requesting of limits change for all account types

#### Changed
- Renamed "Subtype" table header to "Direction" on "Fees" page
- Renamed  "Sale state updated" -> "Sale closed" (state) in movements lists

#### Fixed
- Now display negative amount on balance effect viewers
- Sidebar displaying in Safari browser on small screens
- Scrolling to the top of the form after moving to a next step in:
  - Asset create form
  - Asset update form
  - Create sale form
- Bug with a sale investment total amount calculation when you were unable to
  submit an amount equal to hard cap
- Amount validation in "Withdrawal" forms now work correctly
- Asset name displaying on most screens
- Displaying long strings (asset name, sale short description) inside card-like
  components
- "Tokens" page responsive design
- Do not allow unverified users to add an asset with "KYC required" type to
  their balances
- Now forms that show "Available balance" hint show actual balance
- Sorting of order book (now descending for asks)
- Invalid start date for sales that are already started
- Fixed a bug with impossible order cancelling if user has insufficient balance
- Fixed a bug with chart line rendering

### "Under the hood" changes
#### Added
- CLI arguments support
- Module-descriptors schemes (see `src/modules-arch/README.md`)
- Experimental features section to README.md
- Custom validation rules for sales "Soft cap" and "Hard cap" values
- A feature that makes your tests execution fail if there is any `console.log`,
  `console.warn` or `console.error` call
- Account reset related stuff:
  - `isAccountRoleReseted` state field to the KYC vuex module
  - Checking for previous account role & resetting reason when loading
    KYC request
  - Checking for reset account role on verification pages
  - `resetReason` field to the `ChangeRoleRequestRecord`
- Movements history modules unit tests
- `record` getter to the `AssetRecord`

#### Changed
- Use @tokend/js-sdk@1.3.1-x.2
- Now using new account endpoint for loading fees
- Renamed `DescriptionEditor` => `MarkdownField`. Also moved to the fields
  directory & included it to the form mixin components
- Moved fees filters out of global scope to the corresponding viewer components
- One request to fetch all the account roles instead of fetching then one-by-one
- Asset loading via the loop instead of fetching by `filter[limit]=100`
- Modularized:
  - Issuance explorer page
  - Fees page
  - TopBar component

#### Removed
- Removed feature flags from config
- Removed `globalize` from asset creating forms’ `assetTypes` computed property
- Converting account role to string in `ChangeRoleRequestRecord`

#### Fixed
- Loading balances instead of account on "Movements" page
- Loading balances instead of account on withdrawal form
- Checking for KYC state, not for KYC latest data while loading KYC in the
  verification forms
- Replace translation IDs of no-data-message component with non-translatable
  analogues (should provide already translated strings now)
- Pending status updating in the "Change Limits" form
- Fixed console errors causing in "Movements" page unit tests
- Fixed `getAccountIdByEmail`’s email fetching bug of identity-getter.js
- Fixed a bug with import `mapActions` in `SubmitTradeOfferForm`

## [1.3.1-rc.0] - 2019-03-20
### "Under the hood" changes
#### Changed
- Do not throw an error if movement has an unknown effect or operation details

#### Fixed
- Not handling 'manage-asset-pair' operation details
- Fixed bug when user invested in sales but in history
  instead of 'Investment' was 'Offer'

## [1.3.0] - 2019-03-01

[Unreleased]: https://github.com/tokend/web-client/compare/1.13.0-rc.2...HEAD
[1.13.0-rc.2]: https://github.com/tokend/web-client/compare/1.13.0-rc.1...1.13.0-rc.2
[1.13.0-rc.1]: https://github.com/tokend/web-client/compare/1.13.0-rc.0...1.13.0-rc.1
[1.13.0-rc.0]: https://github.com/tokend/web-client/compare/1.12.0...1.13.0-rc.0
[1.12.0]: https://github.com/tokend/web-client/compare/1.12.0-rc.6...1.12.0
[1.12.0-rc.6]: https://github.com/tokend/web-client/compare/1.12.0-rc.5...1.12.0-rc.6
[1.12.0-rc.5]: https://github.com/tokend/web-client/compare/1.12.0-rc.4...1.12.0-rc.5
[1.12.0-rc.4]: https://github.com/tokend/web-client/compare/1.12.0-rc.3...1.12.0-rc.4
[1.12.0-rc.3]: https://github.com/tokend/web-client/compare/1.12.0-rc.2...1.12.0-rc.3
[1.12.0-rc.2]: https://github.com/tokend/web-client/compare/1.12.0-rc.1...1.12.0-rc.2
[1.12.0-rc.1]: https://github.com/tokend/web-client/compare/1.12.0-rc.0...1.12.0-rc.1
[1.12.0-rc.0]: https://github.com/tokend/web-client/compare/1.11.0...1.12.0-rc.0
[1.11.0]: https://github.com/tokend/web-client/compare/1.11.0-rc.2...1.11.0
[1.11.0-rc.2]: https://github.com/tokend/web-client/compare/1.11.0-rc.1...1.11.0-rc.2
[1.11.0-rc.1]: https://github.com/tokend/web-client/compare/1.11.0-rc.0...1.11.0-rc.1
[1.11.0-rc.0]: https://github.com/tokend/web-client/compare/1.10.3...1.11.0-rc.0
[1.10.3]: https://github.com/tokend/web-client/compare/1.10.3-rc.2...1.10.3
[1.10.3-rc.2]: https://github.com/tokend/web-client/compare/1.10.3-rc.1...1.10.3-rc.2
[1.10.3-rc.1]: https://github.com/tokend/web-client/compare/1.10.3-rc.0...1.10.3-rc.1
[1.10.3-rc.0]: https://github.com/tokend/web-client/compare/1.10.2...1.10.3-rc.0
[1.10.2]: https://github.com/tokend/web-client/compare/1.10.2-rc.0...1.10.2
[1.10.2-rc.0]: https://github.com/tokend/web-client/compare/1.10.1...1.10.2-rc.0
[1.10.1]: https://github.com/tokend/web-client/compare/1.10.1-rc.1...1.10.1
[1.10.1-rc.1]: https://github.com/tokend/web-client/compare/1.10.1-rc.0...1.10.1-rc.1
[1.10.1-rc.0]: https://github.com/tokend/web-client/compare/1.10.0...1.10.1-rc.0
[1.10.0]: https://github.com/tokend/web-client/compare/1.10.0-rc.7...1.10.0
[1.10.0-rc.7]: https://github.com/tokend/web-client/compare/1.10.0-rc.6...1.10.0-rc.7
[1.10.0-rc.6]: https://github.com/tokend/web-client/compare/1.10.0-rc.5...1.10.0-rc.6
[1.10.0-rc.5]: https://github.com/tokend/web-client/compare/1.10.0-rc.4...1.10.0-rc.5
[1.10.0-rc.4]: https://github.com/tokend/web-client/compare/1.10.0-rc.3...1.10.0-rc.4
[1.10.0-rc.3]: https://github.com/tokend/web-client/compare/1.10.0-rc.2...1.10.0-rc.3
[1.10.0-rc.2]: https://github.com/tokend/web-client/compare/1.10.0-rc.1...1.10.0-rc.2
[1.10.0-rc.1]: https://github.com/tokend/web-client/compare/1.10.0-rc.0...1.10.0-rc.1
[1.10.0-rc.0]: https://github.com/tokend/web-client/compare/1.10.0-x.2...1.10.0-rc.0
[1.10.0-x.2]: https://github.com/tokend/web-client/compare/1.10.0-x.1...1.10.0-x.2
[1.10.0-x.1]: https://github.com/tokend/web-client/compare/1.10.0-x.0...1.10.0-x.1
[1.10.0-x.0]: https://github.com/tokend/web-client/compare/1.9.1...1.10.0-x.0
[1.9.1]: https://github.com/tokend/web-client/compare/1.9.0...1.9.1
[1.9.0]: https://github.com/tokend/web-client/compare/1.9.0-rc.1...1.9.0
[1.9.0-rc.1]: https://github.com/tokend/web-client/compare/1.9.0-rc.0...1.9.0-rc.1
[1.9.0-rc.0]: https://github.com/tokend/web-client/compare/1.8.0...1.9.0-rc.0
[1.8.0]: https://github.com/tokend/web-client/compare/1.8.0-rc.3...1.8.0
[1.8.0-rc.3]: https://github.com/tokend/web-client/compare/1.8.0-rc.2...1.8.0-rc.3
[1.8.0-rc.2]: https://github.com/tokend/web-client/compare/1.8.0-rc.1...1.8.0-rc.2
[1.8.0-rc.1]: https://github.com/tokend/web-client/compare/1.8.0-rc.0...1.8.0-rc.1
[1.8.0-rc.0]: https://github.com/tokend/web-client/compare/1.8.0-x.3...1.8.0-rc.0
[1.8.0-x.3]: https://github.com/tokend/web-client/compare/1.8.0-x.2...1.8.0-x.3
[1.8.0-x.2]: https://github.com/tokend/web-client/compare/1.8.0-x.1...1.8.0-x.2
[1.8.0-x.1]: https://github.com/tokend/web-client/compare/1.8.0-x.0...1.8.0-x.1
[1.8.0-x.0]: https://github.com/tokend/web-client/compare/1.7.0...1.8.0-x.0
[1.7.0]: https://github.com/tokend/web-client/compare/1.7.0-rc.4...1.7.0
[1.7.0-rc.4]: https://github.com/tokend/web-client/compare/1.7.0-rc.3...1.7.0-rc.4
[1.7.0-rc.3]: https://github.com/tokend/web-client/compare/1.7.0-rc.2...1.7.0-rc.3
[1.7.0-rc.2]: https://github.com/tokend/web-client/compare/1.7.0-rc.1...1.7.0-rc.2
[1.7.0-rc.1]: https://github.com/tokend/web-client/compare/1.7.0-rc.0...1.7.0-rc.1
[1.7.0-rc.0]: https://github.com/tokend/web-client/compare/1.6.0...1.7.0-rc.0
[1.6.0]: https://github.com/tokend/web-client/compare/1.6.0-rc.0...1.6.0
[1.6.0-rc.0]: https://github.com/tokend/web-client/compare/1.6.0-x.2...1.6.0-rc.0
[1.6.0-x.2]: https://github.com/tokend/web-client/compare/1.6.0-x.1...1.6.0-x.2
[1.6.0-x.1]: https://github.com/tokend/web-client/compare/1.6.0-x.0...1.6.0-x.1
[1.6.0-x.0]: https://github.com/tokend/web-client/compare/1.5.0...1.6.0-x.0
[1.5.0]: https://github.com/tokend/web-client/compare/1.5.0-rc.3...1.5.0
[1.5.0-rc.3]: https://github.com/tokend/web-client/compare/1.5.0-rc.2...1.5.0-rc.3
[1.5.0-rc.2]: https://github.com/tokend/web-client/compare/1.5.0-rc.1...1.5.0-rc.2
[1.5.0-rc.1]: https://github.com/tokend/web-client/compare/1.5.0-rc.0...1.5.0-rc.1
[1.5.0-rc.0]: https://github.com/tokend/web-client/compare/1.4.0...1.5.0-rc.0
[1.4.0]: https://github.com/tokend/web-client/compare/1.4.0-rc.3...1.4.0
[1.4.0-rc.3]: https://github.com/tokend/web-client/compare/1.4.0-rc.2...1.4.0-rc.3
[1.4.0-rc.2]: https://github.com/tokend/web-client/compare/1.4.0-rc.1...1.4.0-rc.2
[1.4.0-rc.1]: https://github.com/tokend/web-client/compare/1.4.0-rc.0...1.4.0-rc.1
[1.4.0-rc.0]: https://github.com/tokend/web-client/compare/1.3.1-rc.0...1.4.0-rc.0
[1.3.1-rc.0]: https://github.com/tokend/web-client/compare/1.3.0...1.3.1-rc.0
[1.3.0]: https://github.com/tokend/web-client/releases/tag/1.3.0
