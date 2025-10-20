const CHANNEL_ID = 'UCZvYRvdmGJUlggxFxwM-pgw'; // Replace with your channel ID
const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your API key
const subscriberCountElement = document.getElementById('subscriberCount');

async function updateSubscriberCount() {
  const count = await getSubscriberCount(CHANNEL_ID, API_KEY);
  if (count !== null) {
    subscriberCountElement.textContent = count;
  } else {
    subscriberCountElement.textContent = 'Error';
  }
}

updateSubscriberCount();
setInterval(updateSubscriberCount, 10000);

async function getSubscriberCount(channelId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].statistics.subscriberCount;
    }
    return null;
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
      return null;
    }
}
