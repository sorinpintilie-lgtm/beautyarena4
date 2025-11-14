/**
 * Description Modifier Utility
 * Makes small modifications to product descriptions to avoid copyright issues
 * while maintaining the meaning and usefulness
 */

export class DescriptionModifier {
  /**
   * Modify HTML description to avoid copyright
   * Makes subtle changes while preserving meaning
   */
  static modifyDescription(htmlDescription) {
    if (!htmlDescription) return '';

    let modified = htmlDescription;

    // Replace common phrases with alternatives
    const replacements = {
      'SCOP:': 'Destinație:',
      'ACȚIUNE:': 'Beneficii:',
      'INDICAȚII:': 'Recomandat pentru:',
      'APLICARE:': 'Mod de utilizare:',
      'FORMAT:': 'Disponibil în:',
      'CARACTERISTICI:': 'Proprietăți:',
      'UTILIZARE:': 'Cum se folosește:',
      'ideal pentru': 'perfect pentru',
      'conferă': 'oferă',
      'netezește': 'uniformizează',
      'protejând': 'protejează',
      'restaurându-i': 'restaurează',
      'prevenind': 'previne',
      'Aplică': 'Aplicați',
      'Lasă': 'Lăsați',
      'Clătește': 'Clătiți',
      'Masează': 'Masați'
    };

    // Apply replacements
    Object.entries(replacements).forEach(([original, replacement]) => {
      const regex = new RegExp(original, 'gi');
      modified = modified.replace(regex, replacement);
    });

    return modified;
  }

  /**
   * Generate a unique short description from the full description
   * Extracts key benefits without duplicating content
   */
  static generateShortDescription(fullDescription, maxLength = 200) {
    if (!fullDescription) return '';

    // Remove HTML tags
    const text = fullDescription.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    // Try to find the first sentence or key benefit
    const sentences = text.split(/[.!?]+/);
    let shortDesc = sentences[0]?.trim() || '';

    // If too short, add next sentence
    if (shortDesc.length < 100 && sentences[1]) {
      shortDesc += '. ' + sentences[1].trim();
    }

    // Truncate if too long
    if (shortDesc.length > maxLength) {
      shortDesc = shortDesc.substring(0, maxLength).trim() + '...';
    }

    return shortDesc;
  }

  /**
   * Clean and format description for display
   */
  static cleanDescription(description) {
    if (!description) return '';

    return description
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(strong|b)>/gi, '')
      .replace(/<ul>/gi, '\n')
      .replace(/<\/ul>/gi, '')
      .replace(/<li>/gi, '• ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }
}

export default DescriptionModifier;