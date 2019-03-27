# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Please check our [developers guide](https://gitlab.com/tokend/developers-guide)
for further information about branching and tagging conventions.

## [Unreleased]
### Added
- Issuance explorer module
- Fees module
- User-friendly data displaying in the input fields. If the data does not fit in a field, then three dots are added at the end
- Displaying TokenD logo & load spinner while loading the page
- Documents page
- Document upload form module
- Cancel trade offers in the "My orders" tab on the "Trade" page
- CapsLock warning for the input fields with "password" type
- Displaying asset policies & asset type on the `AssetDetails` page
- `record` getter to the `AssetRecord`
- Added confirmation to cancel token creation request
- CLI config passing
- Added module enabling/disabling
- Added module schemes
- Healthcare document type
- Document explorer page
- Document explorer module
- Withdrawal fiat by the bank information form module
- Withdrawal fiat by the card information form module
- Show destination address holder email in the Withdrawal creation form
- Loyalty points statistics module
- Pre-issuance drawer pseudo module
- Avatar field on verification forms
- Application logo URL for module scheme
- Displaying user avatar in passport
- Loyalty points merchant & reconcillation schemes
- Subject info `Dividend for <token-name>` for every payment operation in dividends
- `All opportunities(All sales)` and `My opportunities(My sales)` pages on the `Opportunities(Funds)` page
- For sales that were ended show highlighted text like a "Closed [days] ago"
- Reword create opportunity label "KYC Required" => "Verification required"
- Asset loading via the loop where was `filter[limit]=100`
- Correct base/quote price calculating for Opportunities
- Custom validation rules for sale's "Soft cap" and "Hard cap" values
- Custom Movements TopBar for REIT scheme
- Add coinpayments-deposit module

### Changed
- Now using new account endpoint for loading the fees
- Moved fees filters to the corresponding viewers
- Renamed `DescriptionEditor` -> `MarkdownField`
- Moved `MarkdownField` to the fields & included it to the form mixin components
- Use @tokend/js-sdk@1.3.1-x.2
- Moved TopBar to the module

### Fixed
- Sidebar displaying in the Safari browser on the small screens
- Scrolling to the top of asset-create-form, asset-update-form, create-sale-form after moving to the next step
- Loading balances instead of account on the movements page
- Checking for KYC state, not for KYC latest data while loading KYC on the verification forms
- Move no-data-message translate ids pass to the elements that use component
- Chart line displaying
- Loading balances instead of account on withdrawal form
- Fix get Account Id By Email
- Investment in the sale. We could not invest the full amount before, because the amount was calculated not according to the base asset, but by quote
- Loader displaying in the Opportunity create form
- Calculated redeem price displaying for old tokens
- Amount validation in the Withdrawal form
- Correct dividends subject
- Fees displaying on the Movements page
- "Soft cap" validation in the "Opportunity create" form
- Asset name displaying
- Change defaultQuoteAsset to single acceptable asset for the Revenue opportunities
- "Tokens" page responsive design
- Do not allow unverified users to add an asset with KYC required type to their balances

## [1.3.1-rc.0] - 2019-03-20

### Changed
- Do not throw an error if movement has an unknown effect or operation details

### Fixed
- Not handling 'manage-asset-pair' operation details

## [1.3.0] - 2019-03-01

[Unreleased]: https://github.com/tokend/web-client/compare/1.3.1-rc.0...HEAD
[1.3.1-rc.0]: https://github.com/tokend/web-client/compare/1.3.0...1.3.1-rc.0
[1.3.0]: https://github.com/tokend/web-client/releases/tag/1.3.0
