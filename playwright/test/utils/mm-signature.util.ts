// @ts-nocheck
export async function handleMetaMaskSignature(context) {
    console.log('⏳ Waiting for MetaMask signature popup...');
    const signaturePage = await context.waitForEvent('page', { timeout: 20000 }).catch(() => null);
    if (!signaturePage) {
        console.log('⚠️ No MetaMask signature popup appeared.');
        return;
    }
    if (!signaturePage.url().includes('notification.html')) {
        console.log(`⚠️ Opened page is not notification.html: ${signaturePage.url()}`);
        return;
    }
    console.log('✅ MetaMask signature popup detected');
    await signaturePage.bringToFront();
    console.log('Popup URL:', signaturePage.url());
    await signaturePage.screenshot({ path: 'signature-popup.png', fullPage: true });
    const signButton = signaturePage.locator(
        '[data-testid="page-container-footer-next"], button:has-text("Sign")'
    );
    await signButton.waitFor({ state: 'visible', timeout: 20000 });
    await signaturePage.waitForTimeout(2000);
    await signButton.click();
    console.log('✅ Signature confirmed');
    try {
        await signaturePage.close();
    } catch {
        console.log('Signature popup already closed by MetaMask');
    }
}
