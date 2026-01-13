# Wix Video Setup Guide for Homepage Video Reels

## Overview
The homepage now displays videos in a modern reel/shorts format instead of Instagram posts. This guide explains how to upload videos to Wix and get their URLs to display on your website.

---

## Step 1: Upload Videos to Wix Media Manager

### Method A: Using Wix Dashboard
1. **Log in to your Wix account** at wix.com
2. **Go to your site dashboard**
3. **Click on "Media" or "Media Manager"** in the left sidebar
4. **Click "Upload Files"** or drag and drop your video files
5. **Select your video files** (MP4, WebM, or MOV formats recommended)
6. **Wait for upload to complete**

### Method B: Using Wix Studio (Recommended)
1. **Open Wix Studio** for your site
2. **Click "Assets"** in the left panel
3. **Go to "Media"** tab
4. **Click "Upload"** and select your video files
5. **Wait for processing** (Wix will optimize your videos)

### Supported Video Formats
- **MP4** (most compatible) ✅
- **WebM** (modern browsers) ✅
- **MOV** (Apple devices) ✅
- **AVI** (less recommended)

### Video Specifications
- **Recommended Resolution**: 1080p (1920x1080) or 720p (1280x720)
- **Aspect Ratio**: 9:16 (vertical/portrait) for shorts format
- **File Size**: Keep under 100MB for faster loading
- **Duration**: 15-60 seconds recommended for reels
- **Frame Rate**: 24-30 fps

---

## Step 2: Get Your Video URL

### Method A: From Wix Media Manager
1. **Go to Media Manager** in your Wix dashboard
2. **Find your uploaded video**
3. **Right-click on the video** and select "Copy Link" or "Get URL"
4. **The URL will look like**:
   ```
   https://static.wixstatic.com/media/[unique-id]~mv2.mp4
   ```

### Method B: From Wix Studio
1. **Open Wix Studio**
2. **Click on Assets > Media**
3. **Find your video**
4. **Hover over it and click the "..." menu**
5. **Select "Copy URL"**

### Method C: Using Wix API (Advanced)
If you need to programmatically get video URLs, you can use the Wix Media API:
```javascript
// Example: Get video URL from Wix API
const videoUrl = await wixMedia.getFileUrl('file-id');
```

---

## Step 3: Update Video URLs in Homepage

### Location in Code
The video URLs are stored in `/src/components/pages/HomePage.tsx` in the `videoReels` array.

### How to Update Videos

**Find this section** (around line 145-175):
```typescript
const videoReels: VideoReel[] = [
  {
    id: 'video-1',
    title: 'Toy Unboxing & Review',
    videoUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.mp4?id=video-1',
    thumbnailUrl: 'https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.jpg?id=video-1-thumb',
    description: 'Check out our latest toy collection'
  },
  // ... more videos
];
```

**Replace with your actual video URLs**:
```typescript
const videoReels: VideoReel[] = [
  {
    id: 'video-1',
    title: 'Your Video Title',
    videoUrl: 'https://static.wixstatic.com/media/YOUR-ACTUAL-VIDEO-ID~mv2.mp4',
    thumbnailUrl: 'https://static.wixstatic.com/media/YOUR-ACTUAL-THUMBNAIL-ID~mv2.jpg',
    description: 'Your video description'
  },
  {
    id: 'video-2',
    title: 'Another Video Title',
    videoUrl: 'https://static.wixstatic.com/media/ANOTHER-VIDEO-ID~mv2.mp4',
    thumbnailUrl: 'https://static.wixstatic.com/media/ANOTHER-THUMBNAIL-ID~mv2.jpg',
    description: 'Another description'
  },
  // Add more videos as needed
];
```

### Video Object Properties
- **id**: Unique identifier (e.g., 'video-1', 'video-2')
- **title**: Display title shown on the video reel
- **videoUrl**: Direct link to your MP4 video file
- **thumbnailUrl**: (Optional) Poster image shown before video plays
- **description**: (Optional) Short description of the video

---

## Step 4: Create Thumbnail Images (Optional)

### Why Thumbnails Matter
- Shows a preview before the video plays
- Improves user experience
- Increases click-through rates

### How to Create Thumbnails
1. **Take a screenshot** from your video at a key moment
2. **Resize to 280x500px** (matches video reel dimensions)
3. **Save as JPG** (smaller file size)
4. **Upload to Wix Media Manager**
5. **Copy the thumbnail URL** and add to `thumbnailUrl` field

### Using Wix's Built-in Thumbnail
If you don't provide a thumbnail URL, Wix will automatically generate one from the first frame of your video.

---

## Step 5: Test Your Videos

### Testing Checklist
- [ ] Videos load without errors
- [ ] Videos play smoothly
- [ ] Thumbnails display correctly
- [ ] Titles and descriptions show properly
- [ ] Marquee scrolling works on desktop
- [ ] Videos are responsive on mobile
- [ ] No console errors in browser

### How to Test
1. **Go to your homepage** in preview mode
2. **Scroll to "Watch Our Videos" section**
3. **Verify all videos display correctly**
4. **Test on mobile devices** (use browser dev tools)
5. **Check video playback** on different browsers

---

## Step 6: Optimize Video Performance

### Best Practices
1. **Compress videos** before uploading
   - Use tools like: HandBrake, FFmpeg, or Adobe Media Encoder
   - Target bitrate: 2-5 Mbps for 1080p

2. **Use appropriate formats**
   - MP4 for maximum compatibility
   - WebM for modern browsers (smaller file size)

3. **Lazy load videos**
   - Videos only load when section comes into view
   - Reduces initial page load time

4. **Add captions** (optional)
   - Improves accessibility
   - Helps with SEO
   - Increases engagement

---

## Video URL Format Reference

### Standard Wix Video URL
```
https://static.wixstatic.com/media/[UNIQUE-ID]~mv2.mp4
```

### With Query Parameters (Optional)
```
https://static.wixstatic.com/media/[UNIQUE-ID]~mv2.mp4?id=video-1
```

### Thumbnail URL Format
```
https://static.wixstatic.com/media/[UNIQUE-ID]~mv2.jpg
```

---

## Troubleshooting

### Videos Not Loading
**Problem**: Videos show "Loading Video..." spinner indefinitely
**Solutions**:
- Check if video URL is correct
- Verify video file is not corrupted
- Try uploading a different video format
- Check browser console for errors

### Videos Not Playing
**Problem**: Videos load but won't play
**Solutions**:
- Ensure video format is MP4 or WebM
- Check video codec compatibility
- Try a different browser
- Verify CORS headers are correct

### Slow Video Loading
**Problem**: Videos take too long to load
**Solutions**:
- Compress video file size
- Use lower resolution (720p instead of 1080p)
- Enable video caching
- Use CDN for faster delivery

### Thumbnail Not Showing
**Problem**: Placeholder image instead of custom thumbnail
**Solutions**:
- Verify thumbnail URL is correct
- Check thumbnail image dimensions (280x500px)
- Ensure thumbnail file is JPG or PNG
- Try uploading a new thumbnail

---

## Advanced: Adding Videos Dynamically

If you want to manage videos from a CMS collection instead of hardcoding them:

### Step 1: Create a "Videos" Collection in Wix
1. Go to your Wix dashboard
2. Click "Content Management"
3. Click "Create Collection"
4. Name it "Videos"
5. Add fields:
   - Title (Text)
   - Video URL (URL)
   - Thumbnail URL (URL)
   - Description (Text)

### Step 2: Update HomePage.tsx
```typescript
import { BaseCrudService } from '@/integrations';

// In your component:
const [videoReels, setVideoReels] = useState<VideoReel[]>([]);

useEffect(() => {
  const fetchVideos = async () => {
    const { items } = await BaseCrudService.getAll('videos');
    setVideoReels(items);
  };
  fetchVideos();
}, []);
```

---

## Video Content Ideas

Here are some video ideas to showcase your toy store:

1. **Product Unboxing** - Unbox and review new toys
2. **Store Tour** - Walk through your physical store
3. **Customer Testimonials** - Happy customers with their purchases
4. **Educational Content** - Tips for choosing age-appropriate toys
5. **Behind-the-Scenes** - How you curate your collection
6. **Toy Demonstrations** - Show toys in action
7. **New Arrivals** - Showcase latest inventory
8. **Safety Tips** - Educate parents about toy safety
9. **DIY Activities** - Creative ways to use toys
10. **Customer Reviews** - Video testimonials from satisfied customers

---

## SEO Tips for Videos

1. **Use descriptive titles** - Include keywords like "toy review" or "educational toys"
2. **Write detailed descriptions** - Help search engines understand content
3. **Add captions** - Improves accessibility and SEO
4. **Create transcripts** - Provide text version of video content
5. **Use relevant tags** - Add tags like "toys", "education", "kids"
6. **Optimize thumbnails** - Use clear, engaging preview images
7. **Add schema markup** - Use VideoObject schema for better indexing

---

## Support & Resources

### Wix Documentation
- [Wix Media Manager Guide](https://support.wix.com/en/article/about-the-media-manager)
- [Uploading Videos to Wix](https://support.wix.com/en/article/uploading-media-files)
- [Video Best Practices](https://support.wix.com/en/article/video-best-practices)

### Video Tools & Resources
- **Compression**: [HandBrake](https://handbrake.fr/), [FFmpeg](https://ffmpeg.org/)
- **Editing**: [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve/), [CapCut](https://www.capcut.com/)
- **Thumbnails**: [Canva](https://www.canva.com/), [Photoshop](https://www.adobe.com/products/photoshop.html)

### Questions?
Contact Wix support or reach out to your development team for assistance.

---

## Summary

✅ **You've successfully set up video reels on your homepage!**

**Next Steps**:
1. Upload your videos to Wix Media Manager
2. Get the video URLs
3. Update the `videoReels` array in HomePage.tsx
4. Test on desktop and mobile
5. Monitor video performance and engagement

**Remember**: Keep videos short (15-60 seconds), use vertical format (9:16), and optimize file sizes for fast loading!
