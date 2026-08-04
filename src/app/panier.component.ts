import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Produit } from './produit.model';

export interface LignePanier {
  produit: Produit;
  quantite: number;
}

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul *ngIf="lignes.length; else panierVide">
      <li *ngFor="let ligne of lignes">{{ ligne.produit.nom }} × {{ ligne.quantite }}</li>
    </ul>
    <ng-template #panierVide>
      <p>Votre panier est vide</p>
    </ng-template>

    <p class="total">Total : {{ total }} €</p>
  `,
})
export class PanierComponent {
  @Input() lignes: LignePanier[] = [];

  get total(): number {
    return this.lignes.reduce((somme, ligne) => somme + ligne.produit.prix * ligne.quantite, 0);
  }
}
