const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('attributes', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:8080/admin');
    // await driver.get('http://150.165.75.99:8080/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  it('testing edit attribute position', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_collection');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute position
    const inputName = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('10');

    // Click in Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('testing edit attribute name in portuguese language', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('dress_material');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Click in Portuguese tab
    await driver.findElement(By.css('[data-locale="pt_PT"]')).click();

    // Edit attribute Portuguese name
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_pt_PT_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Material do vestido');

    // Click in Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('testing edit min and max length of an attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('jeans_material');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute min length
    const inputNameMin = await driver.findElement(By.id('sylius_product_attribute_configuration_min'));
    inputNameMin.click();
    inputNameMin.clear();
    inputNameMin.sendKeys('10');

    // Edit attribute max length
    const inputNameMax = await driver.findElement(By.id('sylius_product_attribute_configuration_max'));
    inputNameMax.click();
    inputNameMax.clear();
    inputNameMax.sendKeys('100');

    // Click in Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('testing edit the name from an attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('length');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute name in English
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Total Length');

    // Click in Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('testing change a product attribute from translatable to non translatable', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('length');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Edit attribute Translatable checkbox
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translatable'));
    inputName.click();

    // Click in Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('test to create a new text attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Click in Create button
    await driver.findElement(By.css('*[class^="ui labeled icon top right floating dropdown button primary link"]')).click();

    // Click in Text attribute button
    await driver.findElement(By.id('text')).click();

    // Fill Product attribute code field (Warning: this field can only be runned once, after you have to change value in sendKeys)
    const inputNameAttribute = await driver.findElement(By.id('sylius_product_attribute_code'));
    inputNameAttribute.click();
    inputNameAttribute.sendKeys('test_new_attribute_selenium_1');

    // Fill Product attribute position field
    const inputNamePosition = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputNamePosition.click();
    inputNamePosition.sendKeys('100');

    // Fill Product attribute name field
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Test New Attribute');

    // Click in Create button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that attribute has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully created.'));
  });

  it('testing edit attribute name in french language', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();
    
    // Select the code type for filtering
    await driver.findElement(By.id('criteria_code_type')).sendKeys('Equal');
    
    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('cap_brand');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain attribute
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[0].click();

    // Click in French tab
    await driver.findElement(By.css('[data-locale="fr_FR"]')).click();

    // Edit attribute name in French
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_fr_FR_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Marque de Casquette');

    // Click in Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that attribute has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully updated.'));
  });

  it('testing delete attributes whose names start with test', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Select the code type for filtering
    await driver.findElement(By.id('criteria_code_type')).sendKeys('Starts with');

    // Type in value input to search for specify attribute
    await driver.findElement(By.id('criteria_code_value')).sendKeys('test');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Select the check box of all attributes
    const bulkCheckbox = await driver.findElement(By.css('input[data-js-bulk-checkboxes=".bulk-select-checkbox"]'));
    await driver.executeScript("arguments[0].click();", bulkCheckbox);

    // Click in delete red button
    await driver.findElement(By.css('*[class^="ui red labeled icon button"]')).click();

    // Click in confirm green button
    await driver.findElement(By.css('*[class^="ui green ok inverted button"]')).click();

    // Assert that attributes have been deleted
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product_attributes have been successfully deleted.'));
  });

  it('testing create a new date attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Click in Create button
    await driver.findElement(By.css('*[class^="ui labeled icon top right floating dropdown button primary link"]')).click();
    
    // Click in Date field
    await driver.findElement(By.id('date')).click();

    // Fill Product attribute code field (Warning: this field can only be runned once, after you have to change value in sendKeys)
    const inputCode = await driver.findElement(By.id('sylius_product_attribute_code'));
    inputCode.click();
    inputCode.sendKeys('expiration_date');

    // Fill Product attribute position field
    const inputPosition = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputPosition.click();
    inputPosition.sendKeys('1');

    // Fill Product attribute format field
    const inputFormat = await driver.findElement(By.id('sylius_product_attribute_configuration_format'));
    inputFormat.click();
    inputFormat.sendKeys('mm/dd/yyyy');

    // Fill Product attribute name field
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Expiration Date');

    // Click in Create button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that attribute has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully created.'));
  });

  it('testing sort filtering results', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Select show option
    await driver.findElement(By.css('*[class^="ui simple fluid dropdown item"]')).click();
    await driver.findElement(By.xpath("//*[contains(@class, 'menu')]//*[contains(@class, 'item') and contains(text(), '50')]")).click();
    
    // Sort attributes by Code column
    await driver.findElement(By.css('th.sortable.sylius-table-column-code a i.sort.icon')).click();
    const firstCode = await driver.findElement(By.css('tbody tr:first-child')).getText();
    assert(firstCode.includes('cap_brand'));

    // Sort attributes by Type column
    await driver.findElement(By.css('th.sortable.sylius-table-column-type a i.sort.icon')).click();
    const firstType = await driver.findElement(By.css('tbody tr:first-child')).getText();
    assert(firstType.includes('Date'));

    // Sort attributes by Translatable column
    await driver.findElement(By.css('th.sortable.sylius-table-column-translatable a i.sort.icon')).click();
    const firstTranslatable = await driver.findElement(By.css('tbody tr:first-child')).getText();
    assert(firstTranslatable.includes('No'));
  });

  it('testing create a new select attribute', async () => {
    // Click in attributes in side menu
    await driver.findElement(By.linkText('Attributes')).click();

    // Click in Create button
    await driver.findElement(By.css('*[class^="ui labeled icon top right floating dropdown button primary link"]')).click();
    
    // Click in Select field
    await driver.findElement(By.id('select')).click();

    // Fill Product attribute code field (Warning: this field can only be runned once, after you have to change value in sendKeys)
    const inputCode = await driver.findElement(By.id('sylius_product_attribute_code'));
    inputCode.click();
    inputCode.sendKeys('select_color');

    // Fill Product attribute position field
    const inputPosition = await driver.findElement(By.id('sylius_product_attribute_position'));
    inputPosition.click();
    inputPosition.sendKeys('2');

    // Fill Product attribute name field
    const inputName = await driver.findElement(By.id('sylius_product_attribute_translations_en_US_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Color');

    // Click in German tab
    await driver.findElement(By.css('[data-locale="de_DE"]')).click();

    // Fill attribute name in German
    const inputNameGerman = await driver.findElement(By.id('sylius_product_attribute_translations_de_DE_name'));
    inputNameGerman.click();
    inputNameGerman.clear();
    inputNameGerman.sendKeys('Farbe');

    // Click in Create button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that attribute has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product attribute has been successfully created.'));
  });
});