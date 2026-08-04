import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface LigneCommande {
  produitId: number;
  quantite: number;
}

export interface Commande {
  id: number;
  clientId: number;
  lignes: LigneCommande[];
  statut: string;
  total: number;
}

@Injectable({ providedIn: "root" })
export class CommandeService {
  private readonly apiUrl = "/api/commandes";

  constructor(private http: HttpClient) {}

  creerCommande(clientId: number, lignes: LigneCommande[]): Observable<Commande> {
    return this.http.post<Commande>(this.apiUrl, { clientId, lignes });
  }
}
