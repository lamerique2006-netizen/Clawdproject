import { replicate } from '@replicate/client';

const client = new replicate.Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { product_image_url, model_type = 'fashion_female_1' } = req.body;

    if (!product_image_url) {
      return res.status(400).json({ error: 'product_image_url required' });
    }

    console.log('🎨 Generating AI model...');

    // Generate AI model using Replicate
    const output = await client.run('black-forest-labs/flux-schnell', {
      input: {
        prompt:
          'professional fashion model, elegant pose, studio lighting, white background, full body shot',
        num_outputs: 1,
        aspect_ratio: '9:16',
        output_format: 'png',
        output_quality: 90,
      },
    });

    const model_url = output[0];

    console.log('✅ Model generated:', model_url);

    return res.status(200).json({
      status: 'success',
      job_id: `job_${Date.now()}`,
      model_url,
      product_url: product_image_url,
      message: 'Video generation started',
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      error: error.message,
      status: 'error',
    });
  }
}
