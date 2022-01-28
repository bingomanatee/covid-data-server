const { getBase64DataURI } = require('dauria');
const S3 = require('aws-sdk/clients/s3');
const S3BlobStore = require('s3-blob-store');
const feathers = require('@feathersjs/feathers');
const BlobService = require('feathers-blob');

const s3 = new S3({
  endpoint: 'https://s3.us-west-2.amazonaws.com',/*
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,*/
});

const blobStore = S3BlobStore({
  client: s3,
  bucket: 'covid-csv-storage'
});

/* eslint-disable no-unused-vars */
class Service extends BlobService {
  constructor() {
    super({
      Model: blobStore
    })
    
  }
};

exports.S3 = Service;

//exports.S3 = class S3 {
/*  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
*/