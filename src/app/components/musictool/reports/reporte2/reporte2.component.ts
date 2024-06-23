import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js'; 
import { BaseChartDirective } from 'ng2-charts';
import { ContentService } from '../../../../services/content.service';

@Component({
  selector: 'app-reporte2',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte2.component.html',
  styleUrl: './reporte2.component.css'
})
export class Reporte2Component implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true
  }

  barChartLabels: string[] = [];

  //barChartType: ChartType = 'pie';

  //barChartType: ChartType = 'doughnut';

  //barChartType: ChartType = 'line';

  //barChartType: ChartType = 'bar';

  barChartType: ChartType = 'polarArea';

  barChartLegend = true
  barChartData:ChartDataset[] = []
  constructor(private cS:ContentService) { }

  ngOnInit(): void {
    this.cS.getArtists().subscribe(data => {
      this.barChartLabels=data.map(item => item.nameArtist)
      this.barChartData=[
        {
          data:data.map(item => item.quantityContent),
          label:'Gasto Total por Área Verde',
          backgroundColor:['#0094d3','#4169c7','#0000CD','#9BBB59','#4BACC6','#4F81BC','#C0504D',],
          borderColor:'rgba(173, 216, 230, 1)',
          borderWidth: 1
        }
      ]
    })
  }
}
