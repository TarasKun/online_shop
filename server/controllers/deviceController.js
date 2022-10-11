const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, information} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpeg';

            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (information) {
                const info = JSON.parse(information);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const {brandId, typeId, limit, page} = req.query;
        const pages = page || 1;
        const limits = limit || 10;
        const offset = pages * limits - limits;
        let devices;

        if (!brandId && !typeId) devices = await Device.findAndCountAll({limit, offset});
        if (brandId && !typeId) devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        if (!brandId && typeId) devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
        if (brandId && typeId) devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]  // or information ???
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController();