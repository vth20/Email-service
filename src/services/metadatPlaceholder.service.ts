import {
  MetadataPlaceholderSchema,
  MetadataPlaceholder,
} from "../models/metadata_placeholder.model.ts";
import { Bson } from "deps";
import EmailPlaceholderService from "./emailPlaceholders.service.ts";

class MetadataPlaceholderService {
  public static async getMetadataPlaceholder(
    search: string,
    page: number,
    limit: number
  ): Promise<MetadataPlaceholderSchema[]> {
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { key: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    return await MetadataPlaceholder.find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  public static getMetadataPlaceholderById(
    id: string
  ): Promise<MetadataPlaceholderSchema | undefined> {
    return MetadataPlaceholder.findOne({ _id: new Bson.ObjectId(id) });
  }

  public static createMetadataPlaceholder(
    payload: MetadataPlaceholderSchema
  ): Promise<string | Bson.ObjectId> {
    return MetadataPlaceholder.insertOne(payload);
  }

  public static async updateMetadataPlaceholder(
    payload: Partial<MetadataPlaceholderSchema>
  ): Promise<Partial<MetadataPlaceholderSchema>> {
    if (!payload._id) {
      throw new Error("Template ID must be provided for update.");
    }

    await MetadataPlaceholder.updateOne(
      { _id: new Bson.ObjectId(payload._id) },
      {
        $set: {
          name: payload.name,
          description: payload.description,
        },
      }
    );

    return payload;
  }

  public static async deleteMetadataPlaceholder(id: string): Promise<number> {
		// delete foreign key in email_placeholders table
    await EmailPlaceholderService.deleteEmailPlaceholderByMetadataPlaceholderIds([id]);
    return await MetadataPlaceholder.deleteOne({ _id: new Bson.ObjectId(id) });
  }
}

export default MetadataPlaceholderService;
