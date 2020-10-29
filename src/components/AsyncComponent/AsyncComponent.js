/**
 * Code splitting Components
 * AsyncComponents
*/
import React from 'react';
import Loadable from 'react-loadable';
import { HulkPageLoader } from '../GlobalComponents';

// Dasboard Urls
const AsyncFullPageUrlsComponent = Loadable({
	loader: () => import("routes/FullPageUrls"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
//  Dashboard 1
const AsyncDashboard1Component = Loadable({
	loader: () => import("routes/Dashboard/Dashboard1"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// Dashboard 2
const AsyncDashboard2Component = Loadable({
	loader: () => import("routes/Dashboard/Dashboard2"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Dashboard 3
const AsyncDashboard3Component = Loadable({
	loader: () => import("routes/Tables/Ausgaben"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncAusgabenComponent
const AsyncAusgabenComponent = Loadable({
	loader: () => import("routes/Tables/Ausgaben"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncOrdersManageComponent
const AsyncOrdersManageComponent = Loadable({
	loader: () => import("routes/Tables/OrdersManage"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// Shop Page
const AsyncShopComponent = Loadable({
	loader: () => import("routes/Ecommerce/Shop"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Product Detail Page
const AsyncProductDetailComponent = Loadable({
	loader: () => import("routes/Ecommerce/ProductDetail"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Cart Page
const AsyncCartComponent = Loadable({
	loader: () => import("routes/Ecommerce/Cart"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Checkout Page
const AsyncCheckoutComponent = Loadable({
	loader: () => import("routes/Ecommerce/Checkout"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Invoice Page
const AsyncInvoiceComponent = Loadable({
	loader: () => import("routes/Ecommerce/Invoice"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// SignIn Page
const AsyncSignInComponent = Loadable({
	loader: () => import("routes/Ecommerce/SignIn"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Email Page
const AsyncMailComponent = Loadable({
	loader: () => import("routes/Email"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// Chat Page
const AsyncChatComponent = Loadable({
	loader: () => import("routes/Chat"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Blog Page
const AsyncBlogGridComponent = Loadable({
	loader: () => import("routes/Blog/BlogGrid"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Tables Page
const AsyncAgGridComponent = Loadable({
	loader: () => import("routes/Tables/AgGrid"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Basic Table
const AsyncBasicTableComponent = Loadable({
	loader: () => import("routes/Tables/BasicTable"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
//
// Search Table
const AsyncSearchTableComponent = Loadable({
	loader: () => import("routes/Tables/SearchTable"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Search Table
const AsyncMedicationComponent = Loadable({
	loader: () => import("routes/Tables/Medication"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Search Table
const AsyncPharmaciesComponent = Loadable({
	loader: () => import("routes/Tables/Pharmacies"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Patients Table
const AsyncPatientsTableComponent = Loadable({
	loader: () => import("routes/Tables/PatientsTable"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// directors Table
const AsyncFamilyDoctorsComponent = Loadable({
	loader: () => import("routes/Tables/FamilyDoctors"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncResourcesComponent Table
const AsyncResourcesComponent = Loadable({
	loader: () => import("routes/Tables/Resources"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncPermissionsComponent Table
const AsyncPermissionsComponent = Loadable({
	loader: () => import("routes/Tables/Permissions"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncRolesComponent Table
const AsyncRolesComponent = Loadable({
	loader: () => import("routes/Tables/Roles"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncInsurancesComponent Table
const AsyncInsurancesComponent = Loadable({
	loader: () => import("routes/Tables/Insurances"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncServicesComponent Table
const AsyncServicesComponent = Loadable({
	loader: () => import("routes/Tables/Services"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncIngredientsComponent Table
const AsyncIngredientsComponent = Loadable({
	loader: () => import("routes/Tables/Ingredients"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncinstancesComponent Table
const AsyncInstancesComponent = Loadable({
	loader: () => import("routes/Tables/Instances"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncUsersComponent Table
const AsyncUsersComponent = Loadable({
	loader: () => import("routes/Tables/Users"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncOrderComponent Table
const AsyncOrderComponent = Loadable({
	loader: () => import("routes/Tables/Orders"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncManageOrdersComponent Table
const AsyncManageOrdersComponent = Loadable({
	loader: () => import("routes/Tables/manageOrders"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncDocumentsComponent Table
const AsyncDocumentsComponent = Loadable({
	loader: () => import("routes/Tables/Documents"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncFoldersComponent Table
const AsyncFoldersComponent = Loadable({
	loader: () => import("routes/Tables/Carefolders"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncvVerordnungsComponent Table
const AsyncvVerordnungsComponent = Loadable({
	loader: () => import("routes/Tables/Verordnungs"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncCareManagersComponent Table
const AsyncCareManagersComponent = Loadable({
	loader: () => import("routes/Tables/CareManagers"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncMapsComponent Table
const AsyncMapsComponent = Loadable({
	loader: () => import("routes/Tables/Maps"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// AsyncEmailTemplatesComponent Table
const AsyncEmailTemplatesComponent = Loadable({
	loader: () => import("routes/Tables/EmailTemplates"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// AsyncEmailTrigersComponent Table
const AsyncEmailTrigersComponent = Loadable({
	loader: () => import("routes/Tables/EmailTrigers"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Blog Detail Page
const AsyncBlogDetailComponent = Loadable({
	loader: () => import("routes/Blog/BlogDetail"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Standard Profile Page
const AsyncStandardComponent = Loadable({
	loader: () => import("routes/Pages/Profile/Standard"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Modern Feeds
const AsyncModernComponent = Loadable({
	loader: () => import("routes/Pages/Profile/Modern"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Contact Page
const AsyncContactGridComponent = Loadable({
	loader: () => import("routes/Pages/ContactGrid"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Faq Page
const AsyncFaqComponent = Loadable({
	loader: () => import("routes/Pages/Faq"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Pricing V1 Page
const AsyncPricingV1Component = Loadable({
	loader: () => import("routes/Pages/Pricing/Style1"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// pricing V2 Page
const AsyncPricingV2Component = Loadable({
	loader: () => import("routes/Pages/Pricing/Style2"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Pricing Upgrade
const AsyncPricingUpgradeComponent = Loadable({
	loader: () => import("routes/Pages/Pricing/PricingUpgrade"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Vertical Timeline
const AsyncVerticalTimelineComponent = Loadable({
	loader: () => import("routes/Pages/Timeline/VerticalTimeline"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Horizontal Timeline
const AsyncHorizontalTimelineComponent = Loadable({
	loader: () => import("routes/Pages/Timeline/HorizontalTimeline"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Horizontal Stepper
const AsyncHorizontalStepperComponent = Loadable({
	loader: () => import("routes/Pages/Stepper/HorizontalStepper"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Vertical Stepper
const AsyncVerticalStepperComponent = Loadable({
	loader: () => import("routes/Pages/Pricing/PricingUpgrade"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Ui Components
const AsyncAppbarComponent = Loadable({
	loader: () => import("routes/UiComponents/AppBar"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncAvatarsComponent = Loadable({
	loader: () => import("routes/UiComponents/Avatars"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncButtonsComponent = Loadable({
	loader: () => import("routes/UiComponents/Buttons"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncBottomNavigationsComponent = Loadable({
	loader: () => import("routes/UiComponents/BottomNavigations"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncChipComponent = Loadable({
	loader: () => import("routes/UiComponents/Chip"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncListComponent = Loadable({
	loader: () => import("routes/UiComponents/List"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncModalsComponent = Loadable({
	loader: () => import("routes/UiComponents/Modals"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Calendar Page
const AsyncCalendarComponent = Loadable({
	loader: () => import("routes/Calendar"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// User Settings
const AsyncUserSettingsComponent = Loadable({
	loader: () => import("routes/UserSettings"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Vedio Player
const AsyncVideoPlayerComponent = Loadable({
	loader: () => import("routes/VideoPlayer"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Error Page 404
const AsyncErrorPage404Component = Loadable({
	loader: () => import("routes/Error/404"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
//AsyncOrderDetailComponent
const AsyncOrderDetailComponent = Loadable({
	loader: () => import("routes/orderDetail"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
//AsyncSharedDocumentComponent
const AsyncSharedDocumentComponent = Loadable({
	loader: () => import("routes/sharedDocument"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// Error Page 500
const AsyncErrorPage500Component = Loadable({
	loader: () => import("routes/Error/500"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

export {
	AsyncFullPageUrlsComponent,
	AsyncDashboard1Component,
	AsyncDashboard2Component,
	AsyncDashboard3Component,
	AsyncShopComponent,
	AsyncProductDetailComponent,
	AsyncCartComponent,
	AsyncCheckoutComponent,
	AsyncSignInComponent,
	AsyncMailComponent,
	AsyncContactGridComponent,
	AsyncStandardComponent,
	AsyncModernComponent,
	AsyncChatComponent,
	AsyncBlogGridComponent,
	AsyncBlogDetailComponent,
	AsyncFaqComponent,
	AsyncPricingV1Component,
	AsyncPricingV2Component,
	AsyncAppbarComponent,
	AsyncAvatarsComponent,
	AsyncButtonsComponent,
	AsyncBottomNavigationsComponent,
	AsyncSearchTableComponent,
	AsyncMedicationComponent,
	AsyncPharmaciesComponent,
	AsyncPatientsTableComponent,
	AsyncFamilyDoctorsComponent,
	AsyncChipComponent,
	AsyncListComponent,
	AsyncModalsComponent,
	AsyncAgGridComponent,
	AsyncBasicTableComponent,
	AsyncPricingUpgradeComponent,
	AsyncVerticalTimelineComponent,
	AsyncHorizontalTimelineComponent,
	AsyncHorizontalStepperComponent,
	AsyncVerticalStepperComponent,
	AsyncInvoiceComponent,
	AsyncCalendarComponent,
	AsyncUserSettingsComponent,
	AsyncErrorPage404Component,
	AsyncErrorPage500Component,
	AsyncVideoPlayerComponent,
	AsyncResourcesComponent,
	AsyncInsurancesComponent,
	AsyncServicesComponent,
	AsyncIngredientsComponent,
	AsyncInstancesComponent,
	AsyncPermissionsComponent,
	AsyncRolesComponent,
	AsyncOrderComponent,
	AsyncUsersComponent,
	AsyncManageOrdersComponent,
	AsyncOrderDetailComponent,
	AsyncDocumentsComponent,
	AsyncFoldersComponent,
	AsyncEmailTemplatesComponent,
	AsyncEmailTrigersComponent,
	AsyncvVerordnungsComponent,
	AsyncSharedDocumentComponent,
	AsyncCareManagersComponent,
	AsyncMapsComponent,
	AsyncAusgabenComponent,
	AsyncOrdersManageComponent
};