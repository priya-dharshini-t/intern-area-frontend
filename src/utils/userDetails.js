import axios from 'axios';
import Bowser from 'bowser';

const getUserDetails = async () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserInfo = browser.getBrowser();
    const osInfo = browser.getOS();
    const platformType = browser.getPlatformType();

    const response = await axios.get('https://api.ipify.org?format=json');
    const ip = response.data.ip;

    const details = {
        browser: browserInfo.name,
        os: osInfo.name,
        deviceType: platformType,
        ip: ip,
    };

    return details;
};

export default getUserDetails;

