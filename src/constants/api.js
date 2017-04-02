/* eslint-disable import/prefer-default-export */
/**
 * @File Contain API constants.
 */
import { API_ENDPOINT_URL, API_URL } from '../config';
// import { CONTENT_TYPE_MAP } from '../constants';

export const API_URL_FOR = {
  // User and session endpoints.
  userToken: `${API_URL}/services/session/token`,
  userCurrent: `${API_ENDPOINT_URL}/system/connect`,
  userLogin: `${API_ENDPOINT_URL}/user/login`,
  userLogout: `${API_ENDPOINT_URL}/user/logout`,
  forgotPassword: `${API_ENDPOINT_URL}/user/forgot_password`,
  resetPassword: `${API_ENDPOINT_URL}/user/reset_password`,
  changePassword: `${API_ENDPOINT_URL}/user`,
  getUserDetails: `${API_ENDPOINT_URL}/user_profile`,
  register: `${API_ENDPOINT_URL}/user/pre_subscriber_register`,
  saveEmailSettings: `${API_ENDPOINT_URL}/user/save_email_settings`,
  loadEmailSettings: `${API_ENDPOINT_URL}/user/load_email_settings`,
  team_members: `${API_ENDPOINT_URL}/member`,
  ipLogin: `${API_ENDPOINT_URL}/user/ip_login`,

  // Billing
  invoiceList: `${API_ENDPOINT_URL}/commerce/list_receipts`,
  invoiceDetail: `${API_ENDPOINT_URL}/commerce/get_receipt`,
  cardList: `${API_ENDPOINT_URL}/commerce/list_cards`,
  updateCard: `${API_ENDPOINT_URL}/commerce/update_card`,
  getStripeKey: `${API_ENDPOINT_URL}/commerce/add_card_init`,
  saveNewCard: `${API_ENDPOINT_URL}/commerce/add_card_save`,

  // BOOKMARKS
  bookmarks: `${API_ENDPOINT_URL}/bookmark`,

  // Taxonomy Meta
  taxonomyMeta: `${API_ENDPOINT_URL}/taxonomy_meta`,

  // Taxonomy
  taxonomy: `${API_ENDPOINT_URL}/taxonomy`,

  // Content endpoints.
  fullContent: `${API_ENDPOINT_URL}/content`,
  latest: `${API_ENDPOINT_URL}/latest`,
  nodeQueue: `${API_ENDPOINT_URL}/nodequeue`, // TODO: has to remove when replaced by entityQueue
  entityQueue: `${API_ENDPOINT_URL}/entityqueue_node`,
  entityQueueTaxonomyTerm: `${API_ENDPOINT_URL}/entityqueue_taxonomy_term`,
  profile: `${API_ENDPOINT_URL}/profile`,
  deleteProfilePicture: `${API_ENDPOINT_URL}/user_picture`,
  uploadProfilePicture: `${API_ENDPOINT_URL}/user_picture/upload`,

  // Search
  search: `${API_ENDPOINT_URL}/search/param`,

  // NewsLetter
  newsletterVerify: `${API_ENDPOINT_URL}/newsletter/verify_email`,
};

// Base url for images.
export const API_IMG_ROOT = `${API_URL}/sites/default/files/styles`;

/**
 * Node Queue id's and node limit for specific page.
 */
