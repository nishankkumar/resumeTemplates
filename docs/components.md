# Сomponents

### Core components
* App.js
* Html.js

### Custom components
* Article
  * Body - Main component to render paragraphs and etc.
  * EditorNotes
  * [EvolvingTheme](../src/components/Article/EvolvingTheme) - This component renders teal or gray block with cards of articles which are connected to this section by the fact. Example usage in README.md
  * Header
  * HighlightBlock
  * Image
  * Quote
  * [SubsectionHeader](../src/components/Article/SubsectionHeader)
  * Text
  * Toolbar
  * YouTube - Just YouTube.
  * Iframe - Simple componente to render iframe.
  * Interrupter - This component render a special div for Piano system.
* ArticleList
* [AuthorBio](../src/components/AuthorBio) - This component provides Author Bio details. Example usage in README.md
* Bookmark
* [CheckBox](../src/components/CheckBox) - This component renders a CheckBox. Example usage in README.md
* [Card](../src/components/Card) - This is a generic component that has predefined styles for card like shapes in the site
* [CardLabel](../src/components/CardLabel) - This is a generic component thats builds on top of Card component with a title tag on the top
* [Circle](../src/components/Circle) - This is a generic component thats has the style to add Circle with inner text in it
* ConnectedContentCard
* ContentCard
* ContentFeed
* ContentGrid
* [ContributorsList](../src/components/ContributorsList) - This component renders list contributors in ContentGrid.
* [CropImageModal](../src/components/CropImageModal) - This component renders Modal to Crop Image.
* DropDown
* [EvolvingTheme](../src/components/Article/EvolvingTheme) - This component renders teal or gray block with cards of articles which are connected to this section by the fact. Example usage in README.md
* FeatureCarousel
* [FilterList](../src/components/FilterList) - This component renders the list of filters with title of filters. Example usage in README.md
* Footer
* Forms
* [GlobalSearch](../src/components/GlobalSearch) - This component provides search input field where existing articles can be searched. Example usage in README.md
* [GoogleTagManager](https://github.com/holidaycheck/react-google-tag-manager/blob/master/README.md) - This component adds Google Tag Manager script to the desired page
* GridBlock
* Header
* [HubSpot](../src/components/HubSpot) - This component allows the add hubspot forms in pages whether inline or as modal forms
* Layout
* Link
  * ArcticleLink - same as link. Should be used for create link for Article on Marcom site depend on content type.
* ListCard
* ListItem
* Logout
* [ManageNotification](../src/components/ManageNotification) - This component provides User Manage Notification Setting Details. Example usage in README.md
* MediaGrid
* MiniGrid
* [Modal](../src/components/Modal) - This component provide modal window functionality. Example usage in README.md
* Navigation
* Profile
  * [Avatar](../src/components/Profile/Avatar) - This component renders the user image, where you can Upload/Delete user image. Example usage in README.md
  * [ChangePasswordForm](../src/components/Profile/ChangePasswordForm) - This component renders Profile Change Password Form. Example usage in README.md
  * [PersonalInformation](../src/components/Profile/PersonalInformation) - This component renders the User's Information Form. Example usage in README.md
* [ReadingBar](../src/components/ReadingBar) - This component provides reading bar with title of page and progress bar at the bottom to show progress. Example usage in README.md
* [RegisterForm](../src/components/Forms/RegisterForm) - This component provides the Register Form for page.
* [RegisterFormPiano](../src/components/Piano/RegisterFormPiano) - This component provides the Register Form Wrapper for article page.
* [ShareWidget](../src/components/ShareWidget) - This component provides social share widget icon and it's functionality to share link. Example usage in README.md
* Source
* [FeatureHeader]()(../src/components/Article/FeatureHeader) - This component Provied the static header for page without the Carousel.
* TableOfContents
* Tags
* TopicsBar
* [UserDetailForm](../src/components/Forms/UserDetailForm) - This component provides the User Details Form.
* Video
* [WelcomeBlock](../src/components/Piano/WelcomeBlock) - This component provides the static welcome to worldview section
* WhatIs
* [Img](../src/components/ReadingBar) - Component to render `<img>` tag basedon api object.
* [AccountHeader](../src/components/AccountHeader) - This component provides Header Nav section for User Management pages. Example usage in README.md
* [ManageUserGrid](../src/components/ManageUserGrid)
  * [AddNewMemberModal](../src/components/ManageUserGrid/AddNewMemberModal) - This component provides AddNewMemberModal for manageUserGrid.
  * [CancelInviteSuccessModal](../src/components/ManageUserGrid/CancelInviteSuccessModal) - This component provides CancelInviteSuccessModal for manageUserGrid.
  * [InvitedUserCard](../src/components/ManageUserGrid/InvitedUserCard) - This component provides InvitedUserCard for manageUserGrid.
  * [RemoveInviteConfirmationModal](../src/components/ManageUserGrid/RemoveInviteConfirmationModal) - This component provides RemoveInviteConfirmationModal for manageUserGrid.
  * [RemoveMemberConfirmationModal](../src/components/ManageUserGrid/RemoveMemberConfirmationModal) - This component provides RemoveMemberConfirmationModal for manageUserGrid.
  * [ResentInvitationModal](../src/components/ManageUserGrid/ResentInvitationModal) - This component provides ResentInvitationModal for manageUserGrid.
  * [UserDetailsCard](../src/components/ManageUserGrid/UserDetailsCard) - This component provides UserDetailsCard for manageUserGrid.
* [ManageBilling](../src/components/ManageBilling) - This component is for managing billing components.
  * [HistoryList](../src/components/ManageBilling/HistoryList) - This component provides HistoryList for ManageBilling.
  * [Card](../src/components/ManageBilling/Card) - This component provides Card for ManageBilling.
  * [BillingRightSideRail](../src/components/ManageBilling/BillingRightSideRail) - This component provides BillingRightSideRail for ManageBilling.
  * [InvoiceDetailModal](../src/components/ManageBilling/InvoiceDetailModal) - This component provides InvoiceDetailModal for ManageBilling.
* [UpdatePaymentCardForm](../src/components/Forms/UpdatePaymentCardForm) - This component provides the Update Payment Card Details form.
* [AddNewCardForm](../src/components/Forms/AddNewCardForm) - This component provides Add new payment card for current user functionality.
* Noscript - use thi component when you want wrap something into <noscript> tag.
* OnboardingTour - use this component to show onboaardding tour to the user.
