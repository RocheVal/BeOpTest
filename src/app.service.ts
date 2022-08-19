import { Injectable } from '@nestjs/common';

const data = [
  {
    date: '2021-01-01T00:00:00.000Z',
    ua: 29351,
    campaign: '60099feb78a21125e81abd33',
    spent_budget: 192430000,
    exit_click: 2749,
    video_complete: 0,
    content_view: 263629,
    video_view: 0,
    total_time_exposed: 1618449,
    video_start: 0,
  },
  {
    date: '2021-01-02T00:00:00.000Z',
    ua: 29351,
    campaign: '60099feb78a21125e81abd33',
    spent_budget: 192430000,
    exit_click: 2749,
    video_complete: 0,
    content_view: 273629,
    video_view: 0,
    total_time_exposed: 1618449,
    video_start: 0,
  },
  {
    date: '2021-01-01T00:00:00.000Z',
    ua: 776,
    campaign: '6009aa3a78a21125e81c5ff1',
    spent_budget: 199832800,
    exit_click: 789,
    video_complete: 54,
    content_view: 249791,
    video_view: 502,
    total_time_exposed: 594802,
    video_start: 366,
  },
  {
    date: '2021-01-02T00:00:00.000Z',
    ua: 777,
    campaign: '6009aa3a78a21125e81c5ff1',
    spent_budget: 199832800,
    exit_click: 789,
    content_view: 49791,
    video_view: 502,
    total_time_exposed: 594802,
    video_start: 366,
  },
  {
    date: '2021-01-03T00:00:00.000Z',
    ua: 77,
    campaign: '6009aa3a78a21125e81c5ff1',
    spent_budget: 199832800,
    exit_click: 789,
    content_view: 791,
    video_view: 502,
    total_time_exposed: 594802,
    video_start: 366,
  },
  {
    date: '2021-01-01T00:00:00.000Z',
    ua: 16514,
    campaign: '600ab800f2f4d62881f82911',
    spent_budget: 645330000,
    exit_click: 9219,
    video_complete: 0,
    content_view: 622488,
    video_view: 0,
    video_start: 0,
  },
  {
    date: '2021-01-02T00:00:00.000Z',
    ua: 16514,
    campaign: '600ab800f2f4d62881f82911',
    spent_budget: 64533000,
    exit_click: 9219,
    video_complete: 0,
    content_view: 62488,
    video_view: 0,
    video_start: 0,
  },
  {
    date: '2021-01-01T00:00:00.000Z',
    ua: 148,
    campaign: '6012c826a168f7294acaa333',
    spent_budget: 51217600,
    exit_click: 9,
    video_complete: 0,
    content_view: 64022,
    video_view: 0,
    total_time_exposed: 98889,
    video_start: 0,
  },
  {
    date: '2021-01-02T00:00:00.000Z',
    ua: 148,
    campaign: '6012c826a168f7294acaa333',
    spent_budget: 51217600,
    exit_click: 9,
    video_complete: 0,
    content_view: 74022,
    video_view: 0,
    video_start: 0,
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getContent(idContent: number): any {
    return {
      idContent: 1,
      type: 'quizz',
      titre: 'Range rover',
      questions: [
        {
          idQuestion: 1,
          idContent: 1,
          titre: 'Question 1',
          choices: [
            {
              idChoice: 1,
              idQuestion: 1,
              titre: 'Choix 1',
            },
          ],
        },
      ],
    };
  }

  getUAForMostViewedCampaign(): any {
    const dictCampaign = {};
    let dictMostViewedCampaign;
    data.forEach((item) => {
      if (dictCampaign[item.campaign]) {
        dictCampaign[item.campaign].content_view += item.content_view;
        dictCampaign[item.campaign].ua += item.ua;
      } else {
        dictCampaign[item.campaign] = {
          content_view: item.content_view,
          ua: item.ua,
          campaign: item.campaign
        };
      }

      if (dictMostViewedCampaign) {
        if (dictCampaign[item.campaign].content_view > dictMostViewedCampaign.content_view) {
          dictMostViewedCampaign = dictCampaign[item.campaign];
        }
      } else {
        dictMostViewedCampaign = dictCampaign[item.campaign];
      }
    });

    return dictMostViewedCampaign;
  }

  getBestCampaignPerDay(date): any {
    const dictBestCampaignPerDay = {};

    data.forEach(item => {
      if(dictBestCampaignPerDay[item.date]) {
        const previousRatio = dictBestCampaignPerDay[item.date].ua / dictBestCampaignPerDay[item.date].content_view;
        const currentRatio = item.ua / item.content_view;

        if (previousRatio < currentRatio) {
          dictBestCampaignPerDay[item.date] = item;
        }
      } else {
        dictBestCampaignPerDay[item.date] = item;
      }
    })

    return dictBestCampaignPerDay[date].campaign;
  }
}
