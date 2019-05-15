import { AppPage } from './app.po';
import {browser, by, element, protractor} from 'protractor';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
      page.navigateTo();
      expect(page.getLandingPageText()).toEqual('Welcome');
    });

  it('should login with test user', () => {
    page.navigateTo();
    // browser.pause();
    element(by.css('input[id=username]')).sendKeys('admin1');
    element(by.css('input[id=userPassword]')).sendKeys('admin1');
    element(by.id('loginBtn')).click();

    // page.navigateToMain();
    expect(page.getMainPageText()).toBe('Main Page');


  });

  it('should logout test user', () => {

    page.navigateTo();
    element(by.css('input[id=username]')).sendKeys('admin1');
    element(by.css('input[id=userPassword]')).sendKeys('admin1');
    element(by.id('loginBtn')).click();

    // page.navigateToMain();
    expect(page.getMainPageText()).toBe('Main Page');
    element(by.css('a[id=logoutLink]')).click();
    // page.navigateTo();
    expect(page.getLandingPageText()).toBe('Welcome');

  });

  it('should update headline', () => {

    page.navigateTo();
    element(by.css('input[id=username]')).sendKeys('admin1');
    element(by.css('input[id=userPassword]')).sendKeys('admin1');
    element(by.id('loginBtn')).click();

    element(by.css('input[id=headlineInput]')).sendKeys('new headline');
    element(by.css('button[id=updateHeadlineBtn]')).click();

    expect(element(by.id('displayHeadline')).getText()).toContain('new headline');

    element(by.css('a[id=logoutLink]')).click();
    page.navigateTo();
    expect(page.getLandingPageText()).toBe('Welcome');

  });

  it('should register new user', () => {
    page.navigateTo();
    // browser.pause();
    element(by.css('input[id=username1]')).sendKeys('guoguo2');
    element(by.css('input[id=password1]')).sendKeys('guoguo2');
    element(by.css('input[id=email]')).sendKeys('guoleo2@hello.com');
    element(by.css('input[id=dob]')).sendKeys('1989-09-01');
    element(by.css('input[id=zip]')).sendKeys('77477');
    element(by.id('register')).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.alertIsPresent(), 4000, 'Alert not found');

    const alert = browser.switchTo().alert();
    const alertText = alert.getText();
    expect(alertText).toContain('You successfully registered!');
    alert.accept();

  });

  it('should login with new user and logout new user', () => {

    page.navigateTo();
    element(by.css('input[id=username]')).sendKeys('guoguo1');
    element(by.css('input[id=userPassword]')).sendKeys('guoguo1');
    element(by.id('loginBtn')).click();

    expect(page.getMainPageText()).toBe('Main Page');

    element(by.css('a[id=logoutLink]')).click();
    expect(page.getLandingPageText()).toBe('Welcome');

  });


  it('should add a new article', () => {

    page.navigateTo();
    element(by.css('input[id=username]')).sendKeys('admin1');
    element(by.css('input[id=userPassword]')).sendKeys('admin1');
    element(by.id('loginBtn')).click();

    element(by.css('textarea[id=articleInput]')).sendKeys('A new article is added');
    element(by.css('button[id=postArticle]')).click();

    expect(element(by.css('p[id=author0]')).getText()).toBe('admin1');

    element(by.css('a[id=logoutLink]')).click();
    page.navigateTo();
    expect(page.getLandingPageText()).toBe('Welcome');

  });

  it('should search for a keyword that matches only one of test user\'s articles', () => {

    page.navigateTo();
    element(by.css('input[id=username]')).sendKeys('admin1');
    element(by.css('input[id=userPassword]')).sendKeys('admin1');
    element(by.id('loginBtn')).click();

    element(by.id('searchTextBox')).sendKeys('CNN');
    element(by.id('search')).click();

    expect(element(by.css('p[id=author0]')).getText()).toBe('CNN');

    element(by.css('a[id=logoutLink]')).click();
    page.navigateTo();
    expect(page.getLandingPageText()).toBe('Welcome');
  });


});
