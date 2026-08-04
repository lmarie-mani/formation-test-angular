import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produit } from './produit.model';

@Component({
  selector: 'app-produit-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="produit-card">
      <h3>{{ produit.nom }}</h3>
      <p>{{ produit.prix }} €</p>

      <span *ngIf="stockFaible" class="badge-stock-faible">Stock faible</span>
      <span *ngIf="enRupture" class="badge-rupture">Rupture de stock</span>

      <button type="button" [disabled]="enRupture" (click)="onAjouter()">Ajouter au panier</button>
    </article>
  `,
})
export class ProduitCardComponent {
  @Input({ required: true }) produit!: Produit;
  @Output() ajouterAuPanier = new EventEmitter<Produit>();

  get enRupture(): boolean {
    return this.produit.stock === 0;
  }

  get stockFaible(): boolean {
    return this.produit.stock > 0 && this.produit.stock <= 2;
  }

  onAjouter(): void {
    if (this.enRupture) {
      return;
    }
    this.ajouterAuPanier.emit(this.produit);
  }
}
