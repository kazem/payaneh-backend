/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Header, Request } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { RequestService } from 'src/modules/requests/requests.service';
import { RequestParametersService } from 'src/modules/requestParameters/requestParameters.service';
import { JSDOM } from 'jsdom';
import axios from 'axios'

@Controller('api')
export class ApiController {
    constructor(private readonly usersService: UsersService,
        private readonly requestsService: RequestService,
        private readonly requestParametersService: RequestParametersService) { }

    @Post(`user`)
    async createTweet(@Body() data: { telegramUsername: string }) {
        const { telegramUsername } = data;
        return this.usersService.createUser({
            telegramUsername
        });
    }

    @Post(`request`)
    async createRequest(@Body() data: { destination: string, source: string, date: string, from: string, to: string, startNotification: string, endNotification: string }) {
        let requestParam = await this.requestParametersService.getRequestParameter(data.destination, data.source, data.date);
        if (!requestParam)
            requestParam = await this.requestParametersService.createRequestParameter(data.destination, data.source, data.date);
        let request = await this.requestsService.getRequestUserByParameter(requestParam.id, 5)
        if (!request)
            request = await this.requestsService.createRequest(requestParam.id, 1, data.from, data.to, data.startNotification, data.endNotification);
        return request;
    }


    @Get(`/getsrcprovinces`)
    async getSrcProvinces() {
        console.log('/getsrcprovinces');
        var dom = null;
        return await axios
            .get('https://v1.payaneh.ir/CRS/index.php')
            .then(result => {
                dom = new JSDOM(result.data);
                var document = dom.window.document;
                let srcProvinces = document.getElementById("sourceProv").children;
                var provinces = [];
                for (let i = 0; i < srcProvinces.length; i++) {
                    let srcProvince = srcProvinces[i];
                    let value = srcProvince.value;
                    let label = srcProvince.firstChild.data.trim();
                    let province = { value: value, label: label }
                    provinces.push(province)
                };
                return provinces;
            })
            .catch(error => {
                console.error('server error: ', error);
            });
    }

    @Get(`/getsrccities`)
    async getSrcCities(@Query('provinceId') provinceId: string) {
        var dom = null;
        return await axios({
            url: `https://payaneh.ir/CRS/Ajax_DistS.php?no=${provinceId}`
        }).then(result => {
            dom = new JSDOM(result.data);
            var document = dom.window.document;
            let srcCities = document.getElementById("sourceCity").children;
            var cities = [];
            for (let i = 0; i < srcCities.length; i++) {
                let srcProvince = srcCities[i];
                let value = srcProvince.value;
                let label = srcProvince.firstChild.data.trim();
                let city = { value: value, label: label }
                cities.push(city)
            };
            return cities;
        })
    }

    @Get(`/getdestprovinces`)
    async getDestProvinces(@Query('cityId') cityId: string) {
        console.log('/getdestprovinces');
        var dom = null;
        return await axios({
            url: `https://payaneh.ir/CRS/Ajax_DistP.php?no=${cityId}`
        }).then(result => {
            dom = new JSDOM(result.data);
            var document = dom.window.document;
            let destProvs = document.getElementById("desProv").children;
            var provs = [];
            for (let i = 0; i < destProvs.length; i++) {
                let destProv = destProvs[i];
                let value = destProv.value;
                let label = destProv.firstChild.data.trim();
                let prov = { value: value, label: label }
                provs.push(prov)
            };
            return provs;
        })
    }

    @Get(`/getdestcities`)
    async getDestCities(@Query('srcCityId') srcCityId: string, @Query('destProvId') destProvId: string) {
        console.log('/getcities');
        var dom = null;
        return await axios({
            url: `https://payaneh.ir/CRS/Ajax_Dist.php?no=${destProvId}&src=${srcCityId}`
        }).then(result => {
            dom = new JSDOM(result.data);
            var document = dom.window.document;
            let destCities = document.getElementById("desCity").children;
            var cities = [];
            for (let i = 0; i < destCities.length; i++) {
                let destCity = destCities[i];
                let value = destCity.value;
                let label = destCity.firstChild.data.trim();
                let city = { value: value, label: label }
                cities.push(city)
            };
            return cities;
        })
    }
}