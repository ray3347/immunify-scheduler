import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IBigClockOut, IBigLogin } from '../interfaces/IBIGLOGIN';
import * as dotenv from 'dotenv';

const axios = require('axios');

dotenv.config();

@Injectable()
export class CronHelper {
  private readonly logger = new Logger(CronHelper.name);

  // public accessToken = "__Host-next-auth.csrf-token=a556a31d08e1e0ae1b3ec894dec00e893d70f169a5de365edfbcc847cdd5c072%7C2430b8e334046427cb4a41f18ce0476d485228e7e4565973d5109b0ec62b6b96; __Secure-next-auth.callback-url=https%3A%2F%2Fbigtech.co.id%2Fbigworks%2Flogin; __Secure-next-auth.session-token.0=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..1g-112GpqEZMSIbL.9URdZZ8TtFmgIt74kDCMZDuhHG6xRiEibreiMC2v7lDFYegQXtyZo5XqEG8oxbIIMNkmVFhCP9S3AFzpVGnXmwldi6l-mi084PwLkb6vabMCvDIluowBVPmjyMqYyIIv3J1MG50k51JeNU-qVrkNkMUrZBWvgPQckKQPynZ-bd11U5lV7kqicvX9NNnmdnBzxhS-SHPy5YPvfFfXNHQyWRhpT1GOqKxIk3PR5qVjCXBHf_pXtj22lqmo_rsXmt1dxVRuStXgbciIU4C2laZ_sHhorugHZVJCafFsAEVCI78-7yTSsYA87iRe7XSZ1K_4wjQeXIuT58Uvy6Fd6MtoOv96Lu66HejYD9MszfkUz8Xs0Bc3b689I4F_mntEZWaCL0wA9HXrbkxEAg9tiiGdGLaV3A6UAUAh70DUAijIMjlILe7heEdt1mMCrIGGcOVcs92ZEilHh96iarGNa-yn4AYYz8A10ayvChdGoIs4OZDyxIDgT42yNAiXqxsj2fFVnzlbYNwmHPH64SFDG2TDn485nZk1zkpy2cmjS3aR3dBap7hAyShbd1BUr6nyGP6oEbN9dNTv37lBcr--zGphbQBgsl5aq6Jjc-A1h2VeMVYxUvuGiH7GMtBLq_UXbxQLk_Oe2jO7w0Zln374pJFmnaZMWsrAxyIbo6Ph7IbKOo72IsxfdY5oYP7QuDytDE5hvZO4Q2OKEbsPpsGKA0iFH4ggpmhnjUr_cYqYv645AC2RLZvcX5T6SrYf6iS6fM7Zj5jJ6DruiLy9SE3jdDwz1Se5RnxgpBznszbB9URH77SOllgG4WIS_EdgBFRJoXiz9vV_13AMhDknBNm69eI_0xuZVTRYPlzrd7yx8d9YKXbvQ-WcxaPQkIrF-svVTHqJdtgf97h5xQ9mAy11VXtGB8TRGOSz_9mD4aOpoyw-rDjpmgXxFc7s0D8P9fQCPAnqkJqT670nMKgfZ9rJ34pCo4rcdJVG3N_rOhLT6ZqI4_5gEJec29oocz8kzIkKRJ-K74TdZhX2_us9crWKGBHkFNPG4mihOBEa8TeD7devvoEui8lbkM1vhpWw_765j7VpXDl3Ggg4kOdb79UGpcgAz6vowc8V-YMndZHpQnO1M2LN738OaL8WqsR9-LCZGHhKkpDpXPVyyABHHygLaIwZ2Jkq9CspJ1KHGuZhnu_j93n06H8CJgGv6OeguwbFVEQR5YHEbOoIAyfLEVQZdbmeM9Anh9RXY-2Wie7cQmMRUhRda4vLH2nJm1RYaY1W85qX5_z8Z0v8DC0nrPzkTgFj2wqIILmpxFvxkcJ_Dwp0jwhiKmYDb6tdWgIqE_gGRupZ5at4mVeM-k4qHfJMnS_DluDsLqPGbrmp44_WDMCKFChSfCAm-UwzJxWiatHmSXMOBOsYNioeGIjzKhnvjlzboBGs5O1-dBuLEfvEKNd9Vql9p4q3pa-qf-TbvbS2dn5VdzJXDGjA1K76wGyQMXHindR6dDu_6ktoVD5zSADcAz9H0SvBOMO1OehNt9QYi1Bf84NxTEQB9u5nyRNYtKO8BYpZTbumfp0cO5HaZo73RQGNNpy2YAk4duhozHl7IJ1iDJk7djfMSe39K5asoRV1ilYjDQQ6ugAcCeIIk9ZuOMwc5WJyat-gaTXRa8b1OrTaoT7oESa3c8dFXo0WpV8Hkp0sGi0aTB7BHscI3OzF3OrolMrBuhF1jRfbzYRehCRQlM1KcVCcCpaNzix7zXZG8Sol6Uml6kbJp97yEOqzzczDg77d9DURUy3i5950gnr3SVmS6YTyrpKzVlZZB8G30Uyb40mmsXnyDDD9OcBUfDvAkjAyP7oy9wPWv-mtlAy-T87xEPX45Xv-YCQ_JlFpotKUDpJwrXwPrQH18V88xFLw2_a-ZnCiRk2MWV1Z3PtNa8QsrSWfp84V6UhmZFIYnIQLL7g4PhLAp3dqRNlZTv_YdR2gXE2L0AjhXYX05gTvY6oJkM5ilJpRTDBaP5tyWEbbgUJgq4fzpyvUNs4gkfDBKrIsK-YMaEDpuV2lLg4it2qxJoQnhRZx5ZuXS6-1262rQKef-9NJIzvpRpOisBztPrdiJSZ5asrykwscyhfe9WPd5PMZgYjggtpcTwbWbWBGnU-czsz0c2a3vXCJYRE49LMk1jeModBGByebXviioJ0imfoKTymmVf1-W8PGKHhArkprhBfZe-gWmyH6JeDF7uPFwAcCAohlZByPHEWkkjq0bgz2pZKRLtm0k4w2QroakqNxON7_Xrqxysc8XvNBuOnMhq4tnElMDG8C5wpL3RpatFabYmz-v01QcX4aWc1nIhj3YTtbmy4FbI6-7e4G5aO6Qv6h4H8Zwtnofdh0csUtT_JUL1JqoTMwaNoK-6yz7c24NdgqX5x_mSeSOhAGB9hxtjQYjfr6RvfoMMg9v8IFD2wvggE6mkNOLOboQDa6LWuFONAaIXMUma_iPF0qkYe2UQaMJhoSZqTk_wTeJa0_QkEAxH-k8bteOr0AbWxanNy3kiLteDZgJjmJ1Dnr1a5QFyLUO8RiYEanmxkyCXqy7Wb0_ILu26SNNKDOUujnjbNKRrzqSetiKsY21kElZtqNjw-U63bCQ_ML1G6m-uxRCoQ0hcN85_rZABXXvpm58JH0p14Atk7OKAwURkC2BaCPwApWeb7J6tj8PASrMYJ0Y6b0svN5r19Rxxj6Eit35zqC8FHk8uKAyn3tjj5LWVOSB_eSOYmQ034zo6RpYvGjLn3EcRg4-fbH_dDYc89TBQQYo1JQ4XTkqfw9csmLFJ7FuvhdgYcVkfsZPB8_Uyy559fnrdBckajaoBy-I9lYvmV77yiUdvOxYZAP5ajZAbuIJMWju-hSHu5a7BzSROE9wmH_3MXBbQ_me2mWmiH3L2Aa9-DxIw5ugwP2sm2VGTvLNS88vwy7IKAicEhPuJx4E4HVOAxk1cJUjoYttAC3Ss0_zM3DJJBz-as2zfLjmq7wjK1jW8n3yNuYMWdzZhgT_z_2fNlScDRRnsN_plbnq4zvfz4bERdcjC-d2qs57vDYeltoDXlTD-sD2-tUPuXcudr9d_1Yt-gl7JmfVcJTFN59VzN6dRzHiVz-WCiyVGIYOiS_dqUAIgRFjzIXWsZrCR-qNcgooxsxaDIn44VRau4WaXoqTFWYCKz8ttFEBclFvkNM9qG27VSDTiYAga-EgfDx3iiE8d1ZfsfEfHGPPQX9V3QhWpdvWkfMKyYhJYPvgDYgzE8LRJPiHNsx9NjUHCRMjFq1Fs8K7NHxxYexdOo6QUtRZ5kk6-DCfiZ0gSjt_zJCTxNvcYDuXJdujSDrR_JQ9t4gfL3ql2kQattobCd-xMmHnyDCwbgfutqIMeohe_cWXXYTvJ4LvcGWPvIUhuEuuLlKSPyD-jFou-MHMUZ_4cSbyL8pEFksCzKD0yUoHz1hnu1-ulnA9POm2WdVdQv_dk_FJyqEVrwg0LqgzL3MQd9cWtGxyOObSfj2nJPVGFzafs5yJc7CSVx23VdtenIgnxxuptf9F4INlkLBtA9ah5DGVVifKsC00rZQWUl-5GDbT9V6gKWWLX_2wPqkKSxLmdCuviZ32umpjdt9R0i_dOI27OJHLRt-XX1Dr6c3uC5bJcUrZgUGrtX8P-7lVcfuP7C6O-RFnF5UQRtbudrILLZFyojRSzq3bs5JMBiKRvlJi2Fsgwa4r-AEo5gz-mzaGswaTSnRJWc522B2CYsZyc4id52D43d8dyOUPIplEaEHL7_3mZTbp27q1Zl9nWuIIQ_nzx0H1gss-fojrT2jTJfqv8M4rSasiqVJEA7A1PFutNU4Ne-vjb5WndeoUJNgWOLcQTvVgs5Y4j24NZh6Fyj8fhR; __Secure-next-auth.session-token.1=nCjc3Kabbn18IzkKWMDGT_-8yYS3OB9jUQig-VZ9FfnRFa_phrqf_O6CYpv7MxMuoqeThCOwnkStoK4uUamI3yFW1DNCvPr4I3gskT_B-AAP0hHvW55azTDxX9fcelw7Y0xm-rqGhG3pZzal5ZeDGM35lYuJqIYsR2uOjxZlHBLiv5C7__vFR6vaURFuBxj54ea3LFIei2pfZ-0HL7miZzIOotLrVW68hG2yVcY1ASCHCznVxR0bsGgu59pkn3FsJX6nOgY5ztYUT2QZYJso0X636TirKUXloSLX-UQD8BTukWp1_TJQNOiETw4exkk0xau0YKcPoeZu5TnthdRLJYVS4gBMeM-VsLFAvJLlqOOm7qkXUSYJEBn7vdJIkYzn94npy2TRYbHa7oeXn5thFaG71w3ih8idpVOCWNKoorCQyHZ9H6AHDNgO72Qefyfyruy4B5EjLYEPM5jUHytXJ_r-zKL78gJOaH7dnWNPCwSCAOGx1jl31uKUarzAyK0seSnu7zcUR8-Ib-FhaBglLj8DFT1pyt408-pNpG2KVgeG6gSj0NVHuYVDZhYZmuvK1hSKGo7xuG2czn7Sr7jXXZ_qEffx9VG668dsumkKLSYMBaI80mZTSQK3t-RNyA7qwRPCeE803ka-miRvxHby4RrTspE57nRuRMVsTSa95AAQJHUbcEMs4hDsdY5dSeJY9sh_V8z4OzbsoGsTioFrZnsDyWiCkXlhklpE0jeMk4ZKxRtFjF-a84FjlfA9oWYchSj_IYi2BXpmu8GAncOZfI2RhOmiuLFTs7qYt8SU9kGlqarJir0tDVmaVUpopiBY9b3jQ38crhHTuzwbTlxdp7IBAhGq9KfV108SPDzQAVmgPgBi12AenmqS8ZrMXF4jCftzFsDhfMeMmPepXOBMyiXg5a4piGQpzwDkAnZz1zfUlzGVPteEISHm50-o-P6bvIEwqPbHeii78LfiYAwShWOveLxW6cNOer2UOHBumCAsVCXWWa2ryGXWOqQ9Ge03DkVu1F3VHPK9f-obgVztGCtwWP-dK8L2H-wN3TdGsdo1swb4cJ1dQzYsWcsfDOo3HaQT0vGBJyOf7t9Cfd_NJdRSVQjqnfgOIgSkdyTVqqE9N5rTPvbjLWVinw0KBsDw6vV6cA6kvq0rkHyhyLxOvClrdKnYn-ADReuHe5-0wP9YdQ92J1NdixRffsADaAj16z4mkDxbwxJ4f_MFz9lpIGUw2GtbFqKoEHLTsj676hcv13aVp3YNh9ku6AxO7I75NBQKv1sic5xlXpDlHcqgX0tok4itOVN85e4CizTpl62HW76_s4ef89eMtwezjNSkpkwABPHuPa9QmdeZsbtnKwClPeJLGLmQEZP1ezdOsirFXNRBpkEPZweSD_WKg_0JB_Pbx2E2cYDJNkfjB16nDoojAXA_NLVoH8PyEgJEI0CvkBZMwVYJMd1B8xi4UL0FFhtGYNo6jQfVQSPeDAGVM66rpDNYBZ8Chu0D5jjnKCi6Mk_1sM2scIjAtLZvke2C1G8fN2dfjMdTdTn5666lRfd5lUXi2DIQeTVDSf5JxM0IEuRgBSAMyraEiu6UquYL0Sy2f9r7qdFb28mHUM5PgmMpLKCsOnJc9nNpLYF-5uGbrNAX9D22brUtDL9X9D5zQ3H7U1GBcQVceTeNc6wWmWd56DQdUSLNFk4vQ0ZEb5j5YOxpgfghctae7u9TUg1D2YyAnFBgwURMgvSWf8Jv7b43Gt_GBb9DQLC9i0AHeenXJM0PbQK9QcC-tTACstKiF5MSyzDKG1_Eiqm11zk9oAGE9XdXhdJ3tebZfYHA1QISnEkHgiQIMI8WiSKY7PGY-aiyr0CO-smTaRvwZ346viaP8iX6lycpRrdjkItMn98NSoNEbTDi8CcD9VJxQqsGKcxwYOc3CPg62XfcDl1abopqjl-cKDb3vXKAXJzJ56svtITZOg0SYuQI1WWbgCoCf4aa6LFUPVLn_JTO1sc5Y8xtdRIkM4sMagBinasO0zXYQlUirwSGx9MHSlPhf4Wc4WlfYRsvuOGx3NNuCMswuHp9lhOcrs3wa64KBvgpefqHT2BSOK3dRKHe4F6naNHvWDX1kKYL_KV3OU65M9hZ9lnr-uE5zSRs9R1ae8CZzBa0oZ60uuaTtQIKJ9C_BMch8qRM3QMJWdmNFE57G5zhZMuutT2CJmK3SNzakaQZd6ryo_UK36G0hbw22Cz-pASSYyzOMlwNRwKvQEhepcNATEY161F0rLOZMCW1SDFKqxEgqcOM0x9srKFI6Jboptz6UBIG1_UcCsB6roE9rXhngfSQT-VFXX8I19wPoduch11p7Ph_2SUR8VMIn8wMMMHI2UQbRMfnEfODopDg5amUlme8GEyfGBS5LR_IozzTkk2KrAEu5Mw-UoKMFJcZGQBYQhPEJ49gv8C9_oWDYihI2IUbLt2n5kdHFD0-hrLh812Qk2xacoaWbriCOEc9GpBVliLRE4g0gc6FHMsWUIMxeDFuwOPhbRoopygHaRJffVV_TBi_OXhMwmetdMFME7OQNGOjR4VK-zorcQebruBGxDXhGx2A_7ZzqAcG-J6dEOeb40lSTkqZ2IQ2CQEH5azmWxRGriUUPPBpA1pBSqvQMuiH6kGFzNycPB_jAhbHtivbwIWgabxajTmtgz9itmytrvrc9qliD1Vne_cV7tdymiIebKBttfgRU-I_CIMDq5NBH3oWwVYrijNwrRrfUTOJjyKVV7JckToEngoiECYnWopjbjTOuNuEL8hiv76eYio1HsbLRe5nD4_sW2VSl_YH9ByScNK5SyyYbjzlQI55rD9CT73KkDhkjkHSh4ItIYMFcufLxWZJXNj0iY1KqLevgt_00Cl1ndYT2nHVOEDAv3RA3VuqTXKj1pKXlzNJybDe2JUF5P-S2FvrWy53FlJUDT5HenVw3Hr8D6So1V-DQKXHqnFXtgdcxnWRM5Tp2E4C0sqB0azSpyESGmxkKgOuCfKXxdd7f1Uj0KcuHCQCwciPtNVIRTBF1H57WSDfvyAf3wr1BnfiKiIOFLIemqlxb3QgzSYa_SyT6qH4MOLSVGQmsaiRlTuTMX9LqLkWfYwEaEO5GXpnz2H5uftpFCfegppGJGpS1le1q5aI-jjaT5RVhW7sEWRjuXL68e590lOqDbqWB-W8BPeSsgFsySnVQn8i5hth_vkMNqjA2dCLI1THzRFFSK0kSJBqgGpdquIj6Z1xqAJb2EtMuhMnWGBTkqzwZf3ss-ynVV9Qu3AFC4-kRrS3EDMWWyjBWN_EUKzFHIQFbJ0Je0Be5wB4InV9D4JQyu492wtKN3NHfQEgzJyfGQ53Pi-12CioLTXZNs-AhhOEEVyM2K9ZjfRELw8zh2LcU20OSe1w2WjLb8VYy7dqEzUsU0rQ_4jAHTQzM3ZC1kBStK7Rh42elQUFpWm4hhcICddBUBx-C72_J4OZnJRehugViJHnqFXfGTvsJuq-5EPIFixSna-GOYq47ST2gC7UO6DkqL7UU69ogdEYJArMxA8lNVAKgg7mlW7wn-VOft0aHBQI1aKVBuNWh0YNjeNnIdXlCuHuUcrmZ6SMsOpdKrCUyM4We65vLN1vQCwKWxMEFsParmfNlblxpQOwnBuyAIgeTOXTGsEaE8Qlu69Vb1zsWzzi0cGVv0EZea8IHHeOjg8dLJmwDTXhj1xwHpcK-qgmA2T6jxOASJddGpAytXHzeEky7TVlkU_tIAi8TF9klCMZ_l-KwJKrg8RTSvbbutYEsKKbI-c7GPPLZPVVxcQFy9vqcDDDRpurLZ6P3vCRyy0_UO9Je0sx2CnLHnwItpsselUUUTctlIXx55z9Rp5YtAAm39-p0ciyJKJJCHG0FuDIECliWn8NcUy2dau4hYy_D-rG_9nfeKicJXtmYWMft; __Secure-next-auth.session-token.2=-aZhrjOX3noV2qqbaQIy55kzCnGVtnTn_HK3Q_K08aKj9bmK5AQMGD3E-IS1Q_pEW3DJUuolBEySCQvoGI3SQfZW-WgDOysEDmx0_Q.45vbJjxy0nfQSHIKvrBPPw";

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async appointmentReminder() {
    const notif = await axios.post(
      'https://immunify-api.vercel.app/user/notification/appointment/reminder',
      null,
      {
        headers: {
          Authorization: 'Bearer QlVfQUxWSU5BX05PXzE=',
        },
      },
    );
    this.logger.debug(notif.data.data);
    console.log(notif.data.data);
  }

  // @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async checkInBinaInovasiGlobal(){
    const user:IBigLogin = await axios.get("https://bigtech.co.id/bigworks/api/auth/session",
      null,
      {
        headers:{
          Cookie: process.env.AUTH_KEY
        }
      }
    )

    await axios.get("https://bigtech.co.id/bigworks-api/v1/attendance/clock-in",null,
      {
        headers:{
          Authorization: `Bearer ${user.accessToken}`
        }
      }
    )
    // https://bigtech.co.id/bigworks-api/v1/attendance/clock-in
  }

  // @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async checkOutBinaInovasiGlobal(){
    const user:IBigLogin = await axios.get("https://bigtech.co.id/bigworks/api/auth/session",
      null,
      {
        headers:{
          Cookie: process.env.AUTH_KEY
        }
      }
    )

    const checkoutObj : IBigClockOut= {
      projects:[
        {
          key: 1,
          project_id: 54,
          regular_hours: 8,
          overtime_hours: 0,
          notes: "-"
        }
      ],
      work_location: 1
    }

    await axios.post('https://bigtech.co.id/bigworks-api/v1/attendance/clock-out',
      checkoutObj,
      {
        headers:{
          Authorization: `Bearer ${user.accessToken}`
        }
      }

    )

    // https://bigtech.co.id/bigworks-api/v1/attendance/clock-out
    // {"projects":[{"key":1,"project_id":54,"regular_hours":8,"overtime_hours":0,"notes":"-"}],"work_location":1}
  }
}
