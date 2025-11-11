import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, MediaType } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) { }

  async uploadFile(file: Express.Multer.File, propertyId: string): Promise<Media> {
    try {
      const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';

      console.log('Uploading file to Cloudinary:', file.path);

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'rumpke-immo/properties',
        resource_type: resourceType,
      });

      console.log('Cloudinary upload result:', uploadResult.secure_url);

      const media = this.mediaRepository.create({
        property_id: propertyId,
        url: uploadResult.secure_url,
        type: resourceType === 'video' ? MediaType.VIDEO : MediaType.IMAGE,
        width: uploadResult.width,
        height: uploadResult.height,
        size_bytes: uploadResult.bytes,
        cloudinary_public_id: uploadResult.public_id,
      });

      const saved = await this.mediaRepository.save(media);

      const fs = require('fs');
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return saved;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  }

  findAll() {
    return this.mediaRepository.find({ relations: ['property'] });
  }

  findOne(id: string) {
    return this.mediaRepository.findOne({
      where: { id },
      relations: ['property'],
    });
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    await this.mediaRepository.update(id, updateMediaDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    if (media?.cloudinary_public_id) {
      await cloudinary.uploader.destroy(media.cloudinary_public_id);
    }
    return this.mediaRepository.delete(id);
  }
}
