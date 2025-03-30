describe('attributes', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });

  it('testing edit attribute position', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('dress_collection');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Edit attribute position
    cy.get('[id="sylius_product_attribute_position"]').clear().type('10');
    // Click in Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('testing edit attribute name in portuguese language', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('dress_material');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Click in Portuguese tab
    cy.get('[data-locale="pt_PT"]').click();
    // Edit attribute name in Portuguese
    cy.get('[id="sylius_product_attribute_translations_pt_PT_name"]').clear().type('Material do vestido');
    // Click in Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('testing edit min and max length of an attribute', () => {
    // Click in attributes in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('jeans_material');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Edit attribute min length
    cy.get('[id="sylius_product_attribute_configuration_min"]').clear().type('10');
    // Edit attribute max length
    cy.get('[id="sylius_product_attribute_configuration_max"]').clear().type('100');
    // Click in Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('testing edit the name from an attribute', () => {
    // Click in attributes in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('length');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Edit attribute name in English
    cy.get('[id="sylius_product_attribute_translations_en_US_name"]').clear().type('Total Length');
    // Click in Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('testing change a product attribute from translatable to non translatable', () => {
    // Click in attributes in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('length');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Click in Translatable checkbox
    cy.get('[id="sylius_product_attribute_translatable"]').uncheck();
    // Click in Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('testing create a new text attribute', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Click in Create button
    cy.get('*[class^="ui labeled icon top right floating dropdown button primary link"]').click();
    // Click in Text field
    cy.clickInFirst('[id="text"]');
    // Fill Product attribute code field
    cy.get('[id="sylius_product_attribute_code"]').type('test_new_attribute');
    // Fill Product attribute position field
    cy.get('[id="sylius_product_attribute_position"]').type('100');
    // Fill Product attribute name field
    cy.get('[id="sylius_product_attribute_translations_en_US_name"]').clear().type('Test New Attribute');
    // Click in Save changes button
    cy.get('*[class^="ui labeled icon primary button"]').scrollIntoView().click();

    // Assert that attribute has been created
    cy.get('body').should('contain', 'Product attribute has been successfully created.');
  });

  it('testing edit attribute name in french language', () => {
    // Click in attributes in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Select the code type for filtering
    cy.get('[id="criteria_code_type"]').select('Equal');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('cap_brand');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain attribute
    cy.clickInFirst('*[class^="ui labeled icon button "]');
    // Click in French tab
    cy.get('[data-locale="fr_FR"]').click();
    // Edit attribute name in French
    cy.get('[id="sylius_product_attribute_translations_fr_FR_name"]').clear().type('Marque de Casquette');
    // Click in Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that attribute has been updated
    cy.get('body').should('contain', 'Product attribute has been successfully updated.');
  });

  it('testing delete attributes whose names start with test', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Select the code type for filtering
    cy.get('[id="criteria_code_type"]').select('Starts with');
    // Type in value input to search for specify attribute
    cy.get('[id="criteria_code_value"]').type('test');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Select the check box of all attributes
    cy.get('input[data-js-bulk-checkboxes=".bulk-select-checkbox"]').check();
    // Click in delete red button
    cy.get('*[class^="ui red labeled icon button"]').first().click();
    // Click in confirm green button
    cy.get('*[class^="ui green ok inverted button"]').click();

    // Assert that attributes have been deleted
    cy.get('body').should('contain', 'Product_attributes have been successfully deleted.');
  });

  it('testing create a new date attribute', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Click in Create button
    cy.get('*[class^="ui labeled icon top right floating dropdown button primary link"]').click();
    // Click on Date field
    cy.clickInFirst('[id="date"]');
    // Fill Product attribute code field
    cy.get('[id="sylius_product_attribute_code"]').type('expiration_date');
    // Fill Product attribute position field
    cy.get('[id="sylius_product_attribute_position"]').type('1');
    // Fill Product attribute format field
    cy.get('[id="sylius_product_attribute_configuration_format"]').type('mm/dd/yyyy');
    // Fill Product attribute name field
    cy.get('[id="sylius_product_attribute_translations_en_US_name"]').type('Expiration Date');
    // Click in Create button
    cy.get('*[class^="ui labeled icon primary button"]').scrollIntoView().click();

    // Assert that attribute has been created
    cy.get('body').should('contain', 'Product attribute has been successfully created.');
  });

  it('testing sort filtering results', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Select show option
    cy.get('*[class^="ui simple fluid dropdown item"]').click();
    cy.get('*[class^="menu"] *[class^="item"]').contains('50').click();
    // Sort attributes by Code column
    cy.get('th.sortable.sylius-table-column-code a i.sort.icon').click();
    cy.get('tbody tr').first().should('contain', 'cap_brand');
    // Sort attributes by Type column
    cy.get('th.sortable.sylius-table-column-type a i.sort.icon').click();
    cy.get('tbody tr').first().should('contain', 'Date');
    // Sort attributes by Translatable column
    cy.get('th.sortable.sylius-table-column-translatable a i.sort.icon').click();
    cy.get('tbody tr').first().should('contain', 'No');
  });

  it('testing create a new select attribute', () => {
    // Click in products in side menu
    cy.clickInFirst('a[href="/admin/product-attributes/"]');
    // Click in Create button
    cy.get('*[class^="ui labeled icon top right floating dropdown button primary link"]').click();
    // Click in Select field
    cy.clickInFirst('[id="select"]');
    // Fill Product attribute code field
    cy.get('[id="sylius_product_attribute_code"]').type('select_color');
    // Fill Product attribute position field
    cy.get('[id="sylius_product_attribute_position"]').type('2');
    // Fill Product attribute name field
    cy.get('[id="sylius_product_attribute_translations_en_US_name"]').type('Color');
    // Click in German tab
    cy.get('[data-locale="de_DE"]').click();
    // Fill attribute name in German
    cy.get('[id="sylius_product_attribute_translations_de_DE_name"]').type('Farbe');
    // Click in Create button
    cy.get('*[class^="ui labeled icon primary button"]').scrollIntoView().click();

    // Assert that attribute has been created
    cy.get('body').should('contain', 'Product attribute has been successfully created.');
  });
});