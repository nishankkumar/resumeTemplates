import _ from 'lodash';
import { TAXONOMY_VOCAB_NAMES } from '../../constants/api';
/**
 * Method to convert response from Taxonomy API into node-like collection
 */
export default function convertToNodeStructure(response, contentType) {
  return response.map((term) => ({
    nid: `term_${term.tid}`,
    title: term.term_name || '',
    type: TAXONOMY_VOCAB_NAMES[term.vocabulary_machine_name] || contentType,
    path_alias: term.path_alias || '',
    teaser_body: term.description || '',
    created_formatted: '',
    videoUrl: '',
    taxonomy: [],
    id: term.tid,
    contentType: TAXONOMY_VOCAB_NAMES[term.vocabulary_machine_name] || contentType,
    contentUrl: term.path_alias || '',
    teaserBody: term.description || '',
    promo_image: term.image && !_.isArray(term.image) ? term.image : null,
  }));
}
